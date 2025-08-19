import { Request, Response } from 'express';
import { db } from '../config/database';
import { blogPosts, blogComments, blogCategories, blogAuthors } from '../database/schema';
import { ValidationUtils } from '../utils/validation';
import { asyncHandler } from '../middleware/errorHandler';
import { eq, desc, and, sql, ne } from 'drizzle-orm';

export class BlogController {
  // Get all blog posts with author and category information
  static getPosts = asyncHandler(async (req: Request, res: Response) => {
    const { page = 1, limit = 10, category, featured, author } = req.query;
    const offset = (Number(page) - 1) * Number(limit);

    let whereClause = undefined;
    if (category) {
      whereClause = eq(blogPosts.categoryId, Number(category));
    }
    if (featured === 'true') {
      whereClause = and(whereClause || undefined, eq(blogPosts.featured, true));
    }
    if (author) {
      whereClause = and(whereClause || undefined, eq(blogPosts.authorId, Number(author)));
    }

    const posts = await db
      .select({
        id: blogPosts.id,
        title: blogPosts.title,
        slug: blogPosts.slug,
        excerpt: blogPosts.excerpt,
        content: blogPosts.content,
        image: blogPosts.image,
        isFeatured: blogPosts.featured,
        isPublished: blogPosts.published,
        publishedAt: blogPosts.publishedAt,
        readTime: blogPosts.readTime,
        views: blogPosts.views,
        commentsCount: blogPosts.commentsCount,
        tags: blogPosts.tags,
        createdAt: blogPosts.createdAt,
        updatedAt: blogPosts.updatedAt,
        // Author information
        authorId: blogAuthors.id,
        authorName: blogAuthors.name,
        authorBio: blogAuthors.bio,
        authorImage: blogAuthors.image,

        authorEmail: blogAuthors.email,
        authorRole: blogAuthors.role,
        authorDepartment: blogAuthors.department,
        // Category information
        categoryId: blogCategories.id,
        categoryName: blogCategories.name,
        categorySlug: blogCategories.slug,
        categoryDescription: blogCategories.description
      })
      .from(blogPosts)
      .leftJoin(blogAuthors, eq(blogPosts.authorId, blogAuthors.id))
      .leftJoin(blogCategories, eq(blogPosts.categoryId, blogCategories.id))
      .where(whereClause)
      .orderBy(desc(blogPosts.createdAt))
      .limit(Number(limit))
      .offset(offset);

    const total = await db
      .select({ count: sql<number>`count(*)` })
      .from(blogPosts)
      .where(whereClause);

    // Transform posts to match frontend expectations
    const transformedPosts = posts.map(post => ({
      id: post.id,
      title: post.title,
      excerpt: post.excerpt,
      author: post.authorName,
      date: new Date(post.createdAt || new Date()).toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      }),
      readTime: post.readTime,
      category: post.categoryName,
      image: post.image || "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      featured: post.isFeatured,
      views: post.views,
      comments: post.commentsCount,
      tags: (() => {
        try {
          if (typeof post.tags === 'string') {
            return JSON.parse(post.tags);
          }
          return post.tags || [];
        } catch (error) {
          console.warn('Failed to parse tags for post:', post.id, error);
          return [];
        }
      })(),
      // Keep admin fields for admin dashboard
      slug: post.slug,
      content: post.content,
      isPublished: post.isPublished,
      isFeatured: post.isFeatured,
      authorId: post.authorId,
      categoryId: post.categoryId,
      createdAt: post.createdAt,
      updatedAt: post.updatedAt
    }));

    res.json({
      success: true,
      data: {
        posts: transformedPosts,
        pagination: {
          page: Number(page),
          limit: Number(limit),
          total: total[0].count,
          pages: Math.ceil(total[0].count / Number(limit))
        }
      }
    });
  });

  // Get post by slug with author and category information
  static getPostBySlug = asyncHandler(async (req: Request, res: Response) => {
    const { slug } = req.params;

    if (!slug) {
      return res.status(400).json({
        success: false,
        message: 'Slug parameter is required'
      });
    }

    const post = await db
      .select({
        id: blogPosts.id,
        title: blogPosts.title,
        slug: blogPosts.slug,
        excerpt: blogPosts.excerpt,
        content: blogPosts.content,
        image: blogPosts.image,
        isFeatured: blogPosts.featured,
        isPublished: blogPosts.published,
        publishedAt: blogPosts.publishedAt,
        readTime: blogPosts.readTime,
        views: blogPosts.views,
        commentsCount: blogPosts.commentsCount,
        tags: blogPosts.tags,
        createdAt: blogPosts.createdAt,
        updatedAt: blogPosts.updatedAt,
        // Author information
        authorId: blogAuthors.id,
        authorName: blogAuthors.name,
        authorBio: blogAuthors.bio,
        authorImage: blogAuthors.image,

        authorEmail: blogAuthors.email,
        authorRole: blogAuthors.role,
        authorDepartment: blogAuthors.department,
        // Category information
        categoryId: blogCategories.id,
        categoryName: blogCategories.name,
        categorySlug: blogCategories.slug,
        categoryDescription: blogCategories.description
      })
      .from(blogPosts)
      .leftJoin(blogAuthors, eq(blogPosts.authorId, blogAuthors.id))
      .leftJoin(blogCategories, eq(blogPosts.categoryId, blogCategories.id))
      .where(eq(blogPosts.slug, slug))
      .limit(1);

    if (!post.length) {
      return res.status(404).json({
        success: false,
        message: 'Post not found'
      });
    }

    const postData = post[0];
    if (!postData) {
      return res.status(404).json({
        success: false,
        message: 'Post not found'
      });
    }

    // Increment view count
    await db
      .update(blogPosts)
      .set({ views: sql`${blogPosts.views} + 1` })
      .where(eq(blogPosts.id, postData.id));

    // Transform post to match frontend expectations
    const transformedPost = {
      id: postData.id,
      title: postData.title,
      slug: postData.slug,
      excerpt: postData.excerpt,
      content: postData.content,
      image: postData.image || "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      featured: postData.isFeatured,
      published: postData.isPublished,
      publishedAt: postData.publishedAt,
      readTime: postData.readTime,
      views: postData.views,
      comments: postData.commentsCount,
      tags: (() => {
        try {
          if (typeof postData.tags === 'string') {
            return JSON.parse(postData.tags);
          }
          return postData.tags || [];
        } catch (error) {
          console.warn('Failed to parse tags for post:', postData.id, error);
          return [];
        }
      })(),
      author: postData.authorName,
      authorBio: postData.authorBio,
      authorImage: postData.authorImage,
      authorEmail: postData.authorEmail,
      authorRole: postData.authorRole,
      authorDepartment: postData.authorDepartment,
      category: postData.categoryName,
      categorySlug: postData.categorySlug,
      categoryDescription: postData.categoryDescription,
      createdAt: postData.createdAt,
      updatedAt: postData.updatedAt
    };

    res.json({
      success: true,
      data: { post: transformedPost }
    });
  });

  // Get all blog categories
  static getCategories = asyncHandler(async (req: Request, res: Response) => {
    const categories = await db
      .select({
        id: blogCategories.id,
        name: blogCategories.name,
        slug: blogCategories.slug,
        description: blogCategories.description,
        isActive: blogCategories.isActive,
        createdAt: blogCategories.createdAt,
        updatedAt: blogCategories.updatedAt
      })
      .from(blogCategories)
      .where(eq(blogCategories.isActive, true))
      .orderBy(blogCategories.name);

    // Get post counts for each category
    const categoriesWithCounts = await Promise.all(
      categories.map(async (category) => {
        const postCount = await db
          .select({ count: sql<number>`count(*)` })
          .from(blogPosts)
          .where(and(
            eq(blogPosts.categoryId, category.id),
            eq(blogPosts.published, true)
          ));

        return {
          id: category.slug,
          label: category.name,
          count: postCount[0].count,
          // Keep admin fields
          categoryId: category.id,
          name: category.name,
          slug: category.slug,
          description: category.description,
          isActive: category.isActive,
          createdAt: category.createdAt,
          updatedAt: category.updatedAt
        };
      })
    );

    // Add "All Posts" category
    const totalPosts = await db
      .select({ count: sql<number>`count(*)` })
      .from(blogPosts)
      .where(eq(blogPosts.published, true));

    const allCategories = [
      {
        id: "all",
        label: "All Posts",
        count: totalPosts[0].count
      },
      ...categoriesWithCounts
    ];

    res.json({
      success: true,
      data: { categories: allCategories }
    });
  });

  // Get categories for admin (simple format)
  static getCategoriesForAdmin = asyncHandler(async (req: Request, res: Response) => {
    const categories = await db
      .select()
      .from(blogCategories)
      .where(eq(blogCategories.isActive, true))
      .orderBy(blogCategories.name);

    res.json({
      success: true,
      data: { categories }
    });
  });

  // Create a new blog category
  static createCategory = asyncHandler(async (req: Request, res: Response) => {
    const { name, slug, description } = req.body;

    if (!name || !slug) {
      return res.status(400).json({
        success: false,
        message: 'Name and slug are required'
      });
    }

    // Check if slug already exists
    const existingCategory = await db
      .select()
      .from(blogCategories)
      .where(eq(blogCategories.slug, slug))
      .limit(1);

    if (existingCategory.length > 0) {
      return res.status(400).json({
        success: false,
        message: 'A category with this slug already exists'
      });
    }

    // Create the category
    const insertResult = await db
      .insert(blogCategories)
      .values({
        name: name.trim(),
        slug: slug.trim(),
        description: description?.trim() || '',
        isActive: true
      });

    // Get the inserted ID
    const insertedId = (insertResult as any).insertId;

    // Fetch the created category
    const createdCategory = await db
      .select()
      .from(blogCategories)
      .where(eq(blogCategories.id, insertedId))
      .limit(1);

    res.status(201).json({
      success: true,
      data: createdCategory[0],
      message: 'Category created successfully'
    });
  });

  // Get all blog authors
  static getAuthors = asyncHandler(async (req: Request, res: Response) => {
    const authors = await db
      .select()
      .from(blogAuthors)
      .where(eq(blogAuthors.isActive, true))
      .orderBy(blogAuthors.name);

    res.json({
      success: true,
      data: { authors }
    });
  });

  // Create a new blog author
  static createAuthor = asyncHandler(async (req: Request, res: Response) => {
    const { name, bio, email, role, department, image } = req.body;

    if (!name) {
      return res.status(400).json({
        success: false,
        message: 'Name is required'
      });
    }

    // Create the author
    const insertResult = await db
      .insert(blogAuthors)
      .values({
        name: name.trim(),
        bio: bio?.trim() || '',
        email: email?.trim() || '',
        role: role?.trim() || '',
        department: department?.trim() || '',
        image: image?.trim() || '',
        isActive: true
      });

    // Get the inserted ID
    const insertedId = (insertResult as any).insertId;

    // Fetch the created author
    const createdAuthor = await db
      .select()
      .from(blogAuthors)
      .where(eq(blogAuthors.id, insertedId))
      .limit(1);

    res.status(201).json({
      success: true,
      data: createdAuthor[0],
      message: 'Author created successfully'
    });
  });

  // Get featured posts
  static getFeaturedPosts = asyncHandler(async (req: Request, res: Response) => {
    const posts = await db
      .select({
        id: blogPosts.id,
        title: blogPosts.title,
        slug: blogPosts.slug,
        excerpt: blogPosts.excerpt,
        image: blogPosts.image,
        readTime: blogPosts.readTime,
        views: blogPosts.views,
        commentsCount: blogPosts.commentsCount,
        createdAt: blogPosts.createdAt,
        // Author information
        authorName: blogAuthors.name,
        authorImage: blogAuthors.image,
        // Category information
        categoryName: blogCategories.name,
        categorySlug: blogCategories.slug
      })
      .from(blogPosts)
      .leftJoin(blogAuthors, eq(blogPosts.authorId, blogAuthors.id))
      .leftJoin(blogCategories, eq(blogPosts.categoryId, blogCategories.id))
      .where(and(eq(blogPosts.featured, true), eq(blogPosts.published, true)))
      .orderBy(desc(blogPosts.createdAt))
      .limit(5);

    res.json({
      success: true,
      data: { posts }
    });
  });

  // Create a new blog post
  static createPost = asyncHandler(async (req: Request, res: Response) => {
    const { title, content, excerpt, categoryId, authorId, image, tags, featured = false, published = false } = req.body;

    // Generate slug from title
    const slug = title.toLowerCase()
      .replace(/[^a-z0-9\s]+/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '');

    const postData = {
      title,
      slug,
      content,
      excerpt,
      categoryId: Number(categoryId),
      authorId: Number(authorId),
      image,
      tags,
      featured,
      published,
      views: 0,
      commentsCount: 0
    };

    const insertResult = await db.insert(blogPosts).values(postData);
    const insertedId = (insertResult as any).insertId;

    // Fetch the created post with full details
    const createdPost = await db
      .select({
        id: blogPosts.id,
        title: blogPosts.title,
        slug: blogPosts.slug,
        excerpt: blogPosts.excerpt,
        content: blogPosts.content,
        image: blogPosts.image,
        isFeatured: blogPosts.featured,
        isPublished: blogPosts.published,
        publishedAt: blogPosts.publishedAt,
        readTime: blogPosts.readTime,
        views: blogPosts.views,
        commentsCount: blogPosts.commentsCount,
        tags: blogPosts.tags,
        createdAt: blogPosts.createdAt,
        updatedAt: blogPosts.updatedAt,
        // Author information
        authorId: blogAuthors.id,
        authorName: blogAuthors.name,
        authorBio: blogAuthors.bio,
        authorImage: blogAuthors.image,

        authorEmail: blogAuthors.email,
        authorRole: blogAuthors.role,
        authorDepartment: blogAuthors.department,
        // Category information
        categoryId: blogCategories.id,
        categoryName: blogCategories.name,
        categorySlug: blogCategories.slug,
        categoryDescription: blogCategories.description
      })
      .from(blogPosts)
      .leftJoin(blogAuthors, eq(blogPosts.authorId, blogAuthors.id))
      .leftJoin(blogCategories, eq(blogPosts.categoryId, blogCategories.id))
      .where(eq(blogPosts.id, insertedId))
      .limit(1);

    res.status(201).json({
      success: true,
      data: createdPost[0],
      message: 'Blog post created successfully'
    });
  });

  // Update a blog post
  static updatePost = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const updateData = req.body;

    // Update the post
    await db
      .update(blogPosts)
      .set(updateData)
      .where(eq(blogPosts.id, Number(id)));

    // Fetch the updated post with full details
    const updatedPost = await db
      .select({
        id: blogPosts.id,
        title: blogPosts.title,
        slug: blogPosts.slug,
        excerpt: blogPosts.excerpt,
        content: blogPosts.content,
        image: blogPosts.image,
        isFeatured: blogPosts.featured,
        isPublished: blogPosts.published,
        publishedAt: blogPosts.publishedAt,
        readTime: blogPosts.readTime,
        views: blogPosts.views,
        commentsCount: blogPosts.commentsCount,
        tags: blogPosts.tags,
        createdAt: blogPosts.createdAt,
        updatedAt: blogPosts.updatedAt,
        // Author information
        authorId: blogAuthors.id,
        authorName: blogAuthors.name,
        authorBio: blogAuthors.bio,
        authorImage: blogAuthors.image,

        authorEmail: blogAuthors.email,
        authorRole: blogAuthors.role,
        authorDepartment: blogAuthors.department,
        // Category information
        categoryId: blogCategories.id,
        categoryName: blogCategories.name,
        categorySlug: blogCategories.slug,
        categoryDescription: blogCategories.description
      })
      .from(blogPosts)
      .leftJoin(blogAuthors, eq(blogPosts.authorId, blogAuthors.id))
      .leftJoin(blogCategories, eq(blogPosts.categoryId, blogCategories.id))
      .where(eq(blogPosts.id, Number(id)))
      .limit(1);

    if (!updatedPost.length) {
      return res.status(404).json({
        success: false,
        message: 'Post not found'
      });
    }

    res.json({
      success: true,
      data: updatedPost[0],
      message: 'Blog post updated successfully'
    });
  });

  // Delete a blog post
  static deletePost = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;

    await db
      .delete(blogPosts)
      .where(eq(blogPosts.id, Number(id)));

    res.json({
      success: true,
      message: 'Blog post deleted successfully'
    });
  });

  // Increment view count
  static incrementViewCount = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;

    await db
      .update(blogPosts)
      .set({ views: sql`${blogPosts.views} + 1` })
      .where(eq(blogPosts.id, Number(id)));

    res.json({
      success: true,
      message: 'View count incremented'
    });
  });

  // Get comments for a post
  static getComments = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const { page = 1, limit = 10 } = req.query;
    const offset = (Number(page) - 1) * Number(limit);

    const comments = await db
      .select()
      .from(blogComments)
      .where(and(
        eq(blogComments.postId, Number(id)),
        eq(blogComments.isApproved, true)
      ))
      .orderBy(desc(blogComments.createdAt))
      .limit(Number(limit))
      .offset(offset);

    const total = await db
      .select({ count: sql<number>`count(*)` })
      .from(blogComments)
      .where(and(
        eq(blogComments.postId, Number(id)),
        eq(blogComments.isApproved, true)
      ));

    res.json({
      success: true,
      data: {
        comments,
        pagination: {
          page: Number(page),
          limit: Number(limit),
          total: total[0].count,
          pages: Math.ceil(total[0].count / Number(limit))
        }
      }
    });
  });

  // Add a comment
  static addComment = asyncHandler(async (req: Request, res: Response) => {
    const { postId, authorName, authorEmail, content, parentId } = req.body;

    const comment = await db
      .insert(blogComments)
      .values({
        postId: Number(postId),
        authorName,
        authorEmail,
        content,
        parentId: parentId ? Number(parentId) : null,
        isApproved: false
      });

    res.status(201).json({
      success: true,
      data: { comment },
      message: 'Comment added successfully and awaiting approval'
    });
  });

  // Approve a comment
  static approveComment = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;

    await db
      .update(blogComments)
      .set({ isApproved: true })
      .where(eq(blogComments.id, Number(id)));

    res.json({
      success: true,
      message: 'Comment approved successfully'
    });
  });

  // Delete a comment
  static deleteComment = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;

    await db
      .delete(blogComments)
      .where(eq(blogComments.id, Number(id)));

    res.json({
      success: true,
      message: 'Comment deleted successfully'
    });
  });

  // Update category
  static updateCategory = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const { name, slug, description } = req.body;

    if (!name || !slug) {
      return res.status(400).json({
        success: false,
        message: 'Name and slug are required'
      });
    }

    // Check if category exists
    const existingCat = await db
      .select()
      .from(blogCategories)
      .where(eq(blogCategories.id, Number(id)))
      .limit(1);

    if (existingCat.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Category not found'
      });
    }

    // Check if slug already exists (excluding current category)
    const duplicateSlug = await db
      .select()
      .from(blogCategories)
      .where(and(
        eq(blogCategories.slug, slug.trim()),
        ne(blogCategories.id, Number(id))
      ))
      .limit(1);

    if (duplicateSlug.length > 0) {
      return res.status(400).json({
        success: false,
        message: 'Category with this slug already exists'
      });
    }

    // Update category
    await db
      .update(blogCategories)
      .set({
        name: name.trim(),
        slug: slug.trim(),
        description: description?.trim() || '',
        updatedAt: new Date()
      })
      .where(eq(blogCategories.id, Number(id)));

    res.json({
      success: true,
      message: 'Category updated successfully',
      data: {
        id: Number(id),
        name: name.trim(),
        slug: slug.trim(),
        description: description?.trim() || ''
      }
    });
  });

  // Delete category
  static deleteCategory = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;

    // Check if category exists
    const existingCat = await db
      .select()
      .from(blogCategories)
      .where(eq(blogCategories.id, Number(id)))
      .limit(1);

    if (existingCat.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Category not found'
      });
    }

    // Check if category has posts
    const postsWithCat = await db
      .select()
      .from(blogPosts)
      .where(eq(blogPosts.categoryId, Number(id)))
      .limit(1);

    if (postsWithCat.length > 0) {
      return res.status(400).json({
        success: false,
        message: 'Cannot delete category that has posts. Please reassign or delete the posts first.'
      });
    }

    // Soft delete by setting isActive to false
    await db
      .update(blogCategories)
      .set({
        isActive: false,
        updatedAt: new Date()
      })
      .where(eq(blogCategories.id, Number(id)));

    res.json({
      success: true,
      message: 'Category deleted successfully'
    });
  });

  // Update author
  static updateAuthor = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const { name, bio, email, role, department, image } = req.body;

    if (!name) {
      return res.status(400).json({
        success: false,
        message: 'Name is required'
      });
    }

    // Check if author exists
    const existingAuthor = await db
      .select()
      .from(blogAuthors)
      .where(eq(blogAuthors.id, Number(id)))
      .limit(1);

    if (existingAuthor.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Author not found'
      });
    }

    // Update author
    await db
      .update(blogAuthors)
      .set({
        name: name.trim(),
        bio: bio?.trim() || '',
        email: email?.trim() || '',
        role: role?.trim() || '',
        department: department?.trim() || '',
        image: image?.trim() || '',
        updatedAt: new Date()
      })
      .where(eq(blogAuthors.id, Number(id)));

    res.json({
      success: true,
      message: 'Author updated successfully',
      data: {
        id: Number(id),
        name: name.trim(),
        bio: bio?.trim() || '',
        email: email?.trim() || '',
        role: role?.trim() || '',
        department: department?.trim() || '',
        image: image?.trim() || ''
      }
    });
  });

  // Delete author
  static deleteAuthor = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;

    // Check if author exists
    const existingAuthor = await db
      .select()
      .from(blogAuthors)
      .where(eq(blogAuthors.id, Number(id)))
      .limit(1);

    if (existingAuthor.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Author not found'
      });
    }

    // Check if author has posts
    const postsWithAuthor = await db
      .select()
      .from(blogPosts)
      .where(eq(blogPosts.authorId, Number(id)))
      .limit(1);

    if (postsWithAuthor.length > 0) {
      return res.status(400).json({
        success: false,
        message: 'Cannot delete author that has posts. Please reassign or delete the posts first.'
      });
    }

    // Soft delete by setting isActive to false
    await db
      .update(blogAuthors)
      .set({
        isActive: false,
        updatedAt: new Date()
      })
      .where(eq(blogAuthors.id, Number(id)));

    res.json({
      success: true,
      message: 'Author deleted successfully'
    });
  });
}
