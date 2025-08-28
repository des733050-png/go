"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlogController = void 0;
const database_1 = require("../config/database");
const schema_1 = require("../database/schema");
const errorHandler_1 = require("../middleware/errorHandler");
const drizzle_orm_1 = require("drizzle-orm");
class BlogController {
}
exports.BlogController = BlogController;
_a = BlogController;
BlogController.getPosts = (0, errorHandler_1.asyncHandler)(async (req, res) => {
    const { page = 1, limit = 10, category, featured, author } = req.query;
    const offset = (Number(page) - 1) * Number(limit);
    let whereClause = undefined;
    if (category) {
        whereClause = (0, drizzle_orm_1.eq)(schema_1.blogPosts.categoryId, Number(category));
    }
    if (featured === 'true') {
        whereClause = (0, drizzle_orm_1.and)(whereClause || undefined, (0, drizzle_orm_1.eq)(schema_1.blogPosts.featured, true));
    }
    if (author) {
        whereClause = (0, drizzle_orm_1.and)(whereClause || undefined, (0, drizzle_orm_1.eq)(schema_1.blogPosts.authorId, Number(author)));
    }
    const posts = await database_1.db
        .select({
        id: schema_1.blogPosts.id,
        title: schema_1.blogPosts.title,
        slug: schema_1.blogPosts.slug,
        excerpt: schema_1.blogPosts.excerpt,
        content: schema_1.blogPosts.content,
        image: schema_1.blogPosts.image,
        isFeatured: schema_1.blogPosts.featured,
        isPublished: schema_1.blogPosts.published,
        publishedAt: schema_1.blogPosts.publishedAt,
        readTime: schema_1.blogPosts.readTime,
        views: schema_1.blogPosts.views,
        commentsCount: schema_1.blogPosts.commentsCount,
        tags: schema_1.blogPosts.tags,
        createdAt: schema_1.blogPosts.createdAt,
        updatedAt: schema_1.blogPosts.updatedAt,
        authorId: schema_1.blogAuthors.id,
        authorName: schema_1.blogAuthors.name,
        authorBio: schema_1.blogAuthors.bio,
        authorImage: schema_1.blogAuthors.image,
        authorEmail: schema_1.blogAuthors.email,
        authorRole: schema_1.blogAuthors.role,
        authorDepartment: schema_1.blogAuthors.department,
        categoryId: schema_1.blogCategories.id,
        categoryName: schema_1.blogCategories.name,
        categorySlug: schema_1.blogCategories.slug,
        categoryDescription: schema_1.blogCategories.description
    })
        .from(schema_1.blogPosts)
        .leftJoin(schema_1.blogAuthors, (0, drizzle_orm_1.eq)(schema_1.blogPosts.authorId, schema_1.blogAuthors.id))
        .leftJoin(schema_1.blogCategories, (0, drizzle_orm_1.eq)(schema_1.blogPosts.categoryId, schema_1.blogCategories.id))
        .where(whereClause)
        .orderBy((0, drizzle_orm_1.desc)(schema_1.blogPosts.createdAt))
        .limit(Number(limit))
        .offset(offset);
    const total = await database_1.db
        .select({ count: (0, drizzle_orm_1.sql) `count(*)` })
        .from(schema_1.blogPosts)
        .where(whereClause);
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
            }
            catch (error) {
                console.warn('Failed to parse tags for post:', post.id, error);
                return [];
            }
        })(),
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
BlogController.getPostBySlug = (0, errorHandler_1.asyncHandler)(async (req, res) => {
    const { slug } = req.params;
    if (!slug) {
        return res.status(400).json({
            success: false,
            message: 'Slug parameter is required'
        });
    }
    const post = await database_1.db
        .select({
        id: schema_1.blogPosts.id,
        title: schema_1.blogPosts.title,
        slug: schema_1.blogPosts.slug,
        excerpt: schema_1.blogPosts.excerpt,
        content: schema_1.blogPosts.content,
        image: schema_1.blogPosts.image,
        isFeatured: schema_1.blogPosts.featured,
        isPublished: schema_1.blogPosts.published,
        publishedAt: schema_1.blogPosts.publishedAt,
        readTime: schema_1.blogPosts.readTime,
        views: schema_1.blogPosts.views,
        commentsCount: schema_1.blogPosts.commentsCount,
        tags: schema_1.blogPosts.tags,
        createdAt: schema_1.blogPosts.createdAt,
        updatedAt: schema_1.blogPosts.updatedAt,
        authorId: schema_1.blogAuthors.id,
        authorName: schema_1.blogAuthors.name,
        authorBio: schema_1.blogAuthors.bio,
        authorImage: schema_1.blogAuthors.image,
        authorEmail: schema_1.blogAuthors.email,
        authorRole: schema_1.blogAuthors.role,
        authorDepartment: schema_1.blogAuthors.department,
        categoryId: schema_1.blogCategories.id,
        categoryName: schema_1.blogCategories.name,
        categorySlug: schema_1.blogCategories.slug,
        categoryDescription: schema_1.blogCategories.description
    })
        .from(schema_1.blogPosts)
        .leftJoin(schema_1.blogAuthors, (0, drizzle_orm_1.eq)(schema_1.blogPosts.authorId, schema_1.blogAuthors.id))
        .leftJoin(schema_1.blogCategories, (0, drizzle_orm_1.eq)(schema_1.blogPosts.categoryId, schema_1.blogCategories.id))
        .where((0, drizzle_orm_1.eq)(schema_1.blogPosts.slug, slug))
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
    await database_1.db
        .update(schema_1.blogPosts)
        .set({ views: (0, drizzle_orm_1.sql) `${schema_1.blogPosts.views} + 1` })
        .where((0, drizzle_orm_1.eq)(schema_1.blogPosts.id, postData.id));
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
            }
            catch (error) {
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
BlogController.getCategories = (0, errorHandler_1.asyncHandler)(async (req, res) => {
    const categories = await database_1.db
        .select({
        id: schema_1.blogCategories.id,
        name: schema_1.blogCategories.name,
        slug: schema_1.blogCategories.slug,
        description: schema_1.blogCategories.description,
        isActive: schema_1.blogCategories.isActive,
        createdAt: schema_1.blogCategories.createdAt,
        updatedAt: schema_1.blogCategories.updatedAt
    })
        .from(schema_1.blogCategories)
        .where((0, drizzle_orm_1.eq)(schema_1.blogCategories.isActive, true))
        .orderBy(schema_1.blogCategories.name);
    const categoriesWithCounts = await Promise.all(categories.map(async (category) => {
        const postCount = await database_1.db
            .select({ count: (0, drizzle_orm_1.sql) `count(*)` })
            .from(schema_1.blogPosts)
            .where((0, drizzle_orm_1.and)((0, drizzle_orm_1.eq)(schema_1.blogPosts.categoryId, category.id), (0, drizzle_orm_1.eq)(schema_1.blogPosts.published, true)));
        return {
            id: category.slug,
            label: category.name,
            count: postCount[0].count,
            categoryId: category.id,
            name: category.name,
            slug: category.slug,
            description: category.description,
            isActive: category.isActive,
            createdAt: category.createdAt,
            updatedAt: category.updatedAt
        };
    }));
    const totalPosts = await database_1.db
        .select({ count: (0, drizzle_orm_1.sql) `count(*)` })
        .from(schema_1.blogPosts)
        .where((0, drizzle_orm_1.eq)(schema_1.blogPosts.published, true));
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
BlogController.getCategoriesForAdmin = (0, errorHandler_1.asyncHandler)(async (req, res) => {
    const categories = await database_1.db
        .select()
        .from(schema_1.blogCategories)
        .where((0, drizzle_orm_1.eq)(schema_1.blogCategories.isActive, true))
        .orderBy(schema_1.blogCategories.name);
    res.json({
        success: true,
        data: { categories }
    });
});
BlogController.createCategory = (0, errorHandler_1.asyncHandler)(async (req, res) => {
    const { name, slug, description } = req.body;
    if (!name || !slug) {
        return res.status(400).json({
            success: false,
            message: 'Name and slug are required'
        });
    }
    const existingCategory = await database_1.db
        .select()
        .from(schema_1.blogCategories)
        .where((0, drizzle_orm_1.eq)(schema_1.blogCategories.slug, slug))
        .limit(1);
    if (existingCategory.length > 0) {
        return res.status(400).json({
            success: false,
            message: 'A category with this slug already exists'
        });
    }
    const insertResult = await database_1.db
        .insert(schema_1.blogCategories)
        .values({
        name: name.trim(),
        slug: slug.trim(),
        description: description?.trim() || '',
        isActive: true
    });
    const insertedId = insertResult.insertId;
    const createdCategory = await database_1.db
        .select()
        .from(schema_1.blogCategories)
        .where((0, drizzle_orm_1.eq)(schema_1.blogCategories.id, insertedId))
        .limit(1);
    res.status(201).json({
        success: true,
        data: createdCategory[0],
        message: 'Category created successfully'
    });
});
BlogController.getAuthors = (0, errorHandler_1.asyncHandler)(async (req, res) => {
    const authors = await database_1.db
        .select()
        .from(schema_1.blogAuthors)
        .where((0, drizzle_orm_1.eq)(schema_1.blogAuthors.isActive, true))
        .orderBy(schema_1.blogAuthors.name);
    res.json({
        success: true,
        data: { authors }
    });
});
BlogController.createAuthor = (0, errorHandler_1.asyncHandler)(async (req, res) => {
    const { name, bio, email, role, department, image } = req.body;
    if (!name) {
        return res.status(400).json({
            success: false,
            message: 'Name is required'
        });
    }
    const insertResult = await database_1.db
        .insert(schema_1.blogAuthors)
        .values({
        name: name.trim(),
        bio: bio?.trim() || '',
        email: email?.trim() || '',
        role: role?.trim() || '',
        department: department?.trim() || '',
        image: image?.trim() || '',
        isActive: true
    });
    const insertedId = insertResult.insertId;
    const createdAuthor = await database_1.db
        .select()
        .from(schema_1.blogAuthors)
        .where((0, drizzle_orm_1.eq)(schema_1.blogAuthors.id, insertedId))
        .limit(1);
    res.status(201).json({
        success: true,
        data: createdAuthor[0],
        message: 'Author created successfully'
    });
});
BlogController.getFeaturedPosts = (0, errorHandler_1.asyncHandler)(async (req, res) => {
    const posts = await database_1.db
        .select({
        id: schema_1.blogPosts.id,
        title: schema_1.blogPosts.title,
        slug: schema_1.blogPosts.slug,
        excerpt: schema_1.blogPosts.excerpt,
        image: schema_1.blogPosts.image,
        readTime: schema_1.blogPosts.readTime,
        views: schema_1.blogPosts.views,
        commentsCount: schema_1.blogPosts.commentsCount,
        createdAt: schema_1.blogPosts.createdAt,
        authorName: schema_1.blogAuthors.name,
        authorImage: schema_1.blogAuthors.image,
        categoryName: schema_1.blogCategories.name,
        categorySlug: schema_1.blogCategories.slug
    })
        .from(schema_1.blogPosts)
        .leftJoin(schema_1.blogAuthors, (0, drizzle_orm_1.eq)(schema_1.blogPosts.authorId, schema_1.blogAuthors.id))
        .leftJoin(schema_1.blogCategories, (0, drizzle_orm_1.eq)(schema_1.blogPosts.categoryId, schema_1.blogCategories.id))
        .where((0, drizzle_orm_1.and)((0, drizzle_orm_1.eq)(schema_1.blogPosts.featured, true), (0, drizzle_orm_1.eq)(schema_1.blogPosts.published, true)))
        .orderBy((0, drizzle_orm_1.desc)(schema_1.blogPosts.createdAt))
        .limit(5);
    res.json({
        success: true,
        data: { posts }
    });
});
BlogController.createPost = (0, errorHandler_1.asyncHandler)(async (req, res) => {
    const { title, content, excerpt, categoryId, authorId, image, tags, featured = false, published = false } = req.body;
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
    const insertResult = await database_1.db.insert(schema_1.blogPosts).values(postData);
    const insertedId = insertResult.insertId;
    const createdPost = await database_1.db
        .select({
        id: schema_1.blogPosts.id,
        title: schema_1.blogPosts.title,
        slug: schema_1.blogPosts.slug,
        excerpt: schema_1.blogPosts.excerpt,
        content: schema_1.blogPosts.content,
        image: schema_1.blogPosts.image,
        isFeatured: schema_1.blogPosts.featured,
        isPublished: schema_1.blogPosts.published,
        publishedAt: schema_1.blogPosts.publishedAt,
        readTime: schema_1.blogPosts.readTime,
        views: schema_1.blogPosts.views,
        commentsCount: schema_1.blogPosts.commentsCount,
        tags: schema_1.blogPosts.tags,
        createdAt: schema_1.blogPosts.createdAt,
        updatedAt: schema_1.blogPosts.updatedAt,
        authorId: schema_1.blogAuthors.id,
        authorName: schema_1.blogAuthors.name,
        authorBio: schema_1.blogAuthors.bio,
        authorImage: schema_1.blogAuthors.image,
        authorEmail: schema_1.blogAuthors.email,
        authorRole: schema_1.blogAuthors.role,
        authorDepartment: schema_1.blogAuthors.department,
        categoryId: schema_1.blogCategories.id,
        categoryName: schema_1.blogCategories.name,
        categorySlug: schema_1.blogCategories.slug,
        categoryDescription: schema_1.blogCategories.description
    })
        .from(schema_1.blogPosts)
        .leftJoin(schema_1.blogAuthors, (0, drizzle_orm_1.eq)(schema_1.blogPosts.authorId, schema_1.blogAuthors.id))
        .leftJoin(schema_1.blogCategories, (0, drizzle_orm_1.eq)(schema_1.blogPosts.categoryId, schema_1.blogCategories.id))
        .where((0, drizzle_orm_1.eq)(schema_1.blogPosts.id, insertedId))
        .limit(1);
    res.status(201).json({
        success: true,
        data: createdPost[0],
        message: 'Blog post created successfully'
    });
});
BlogController.updatePost = (0, errorHandler_1.asyncHandler)(async (req, res) => {
    const { id } = req.params;
    const updateData = req.body;
    await database_1.db
        .update(schema_1.blogPosts)
        .set(updateData)
        .where((0, drizzle_orm_1.eq)(schema_1.blogPosts.id, Number(id)));
    const updatedPost = await database_1.db
        .select({
        id: schema_1.blogPosts.id,
        title: schema_1.blogPosts.title,
        slug: schema_1.blogPosts.slug,
        excerpt: schema_1.blogPosts.excerpt,
        content: schema_1.blogPosts.content,
        image: schema_1.blogPosts.image,
        isFeatured: schema_1.blogPosts.featured,
        isPublished: schema_1.blogPosts.published,
        publishedAt: schema_1.blogPosts.publishedAt,
        readTime: schema_1.blogPosts.readTime,
        views: schema_1.blogPosts.views,
        commentsCount: schema_1.blogPosts.commentsCount,
        tags: schema_1.blogPosts.tags,
        createdAt: schema_1.blogPosts.createdAt,
        updatedAt: schema_1.blogPosts.updatedAt,
        authorId: schema_1.blogAuthors.id,
        authorName: schema_1.blogAuthors.name,
        authorBio: schema_1.blogAuthors.bio,
        authorImage: schema_1.blogAuthors.image,
        authorEmail: schema_1.blogAuthors.email,
        authorRole: schema_1.blogAuthors.role,
        authorDepartment: schema_1.blogAuthors.department,
        categoryId: schema_1.blogCategories.id,
        categoryName: schema_1.blogCategories.name,
        categorySlug: schema_1.blogCategories.slug,
        categoryDescription: schema_1.blogCategories.description
    })
        .from(schema_1.blogPosts)
        .leftJoin(schema_1.blogAuthors, (0, drizzle_orm_1.eq)(schema_1.blogPosts.authorId, schema_1.blogAuthors.id))
        .leftJoin(schema_1.blogCategories, (0, drizzle_orm_1.eq)(schema_1.blogPosts.categoryId, schema_1.blogCategories.id))
        .where((0, drizzle_orm_1.eq)(schema_1.blogPosts.id, Number(id)))
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
BlogController.deletePost = (0, errorHandler_1.asyncHandler)(async (req, res) => {
    const { id } = req.params;
    await database_1.db
        .delete(schema_1.blogPosts)
        .where((0, drizzle_orm_1.eq)(schema_1.blogPosts.id, Number(id)));
    res.json({
        success: true,
        message: 'Blog post deleted successfully'
    });
});
BlogController.incrementViewCount = (0, errorHandler_1.asyncHandler)(async (req, res) => {
    const { id } = req.params;
    await database_1.db
        .update(schema_1.blogPosts)
        .set({ views: (0, drizzle_orm_1.sql) `${schema_1.blogPosts.views} + 1` })
        .where((0, drizzle_orm_1.eq)(schema_1.blogPosts.id, Number(id)));
    res.json({
        success: true,
        message: 'View count incremented'
    });
});
BlogController.getComments = (0, errorHandler_1.asyncHandler)(async (req, res) => {
    const { id } = req.params;
    const { page = 1, limit = 10 } = req.query;
    const offset = (Number(page) - 1) * Number(limit);
    const comments = await database_1.db
        .select()
        .from(schema_1.blogComments)
        .where((0, drizzle_orm_1.and)((0, drizzle_orm_1.eq)(schema_1.blogComments.postId, Number(id)), (0, drizzle_orm_1.eq)(schema_1.blogComments.isApproved, true)))
        .orderBy((0, drizzle_orm_1.desc)(schema_1.blogComments.createdAt))
        .limit(Number(limit))
        .offset(offset);
    const total = await database_1.db
        .select({ count: (0, drizzle_orm_1.sql) `count(*)` })
        .from(schema_1.blogComments)
        .where((0, drizzle_orm_1.and)((0, drizzle_orm_1.eq)(schema_1.blogComments.postId, Number(id)), (0, drizzle_orm_1.eq)(schema_1.blogComments.isApproved, true)));
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
BlogController.addComment = (0, errorHandler_1.asyncHandler)(async (req, res) => {
    const { postId, authorName, authorEmail, content, parentId } = req.body;
    const comment = await database_1.db
        .insert(schema_1.blogComments)
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
BlogController.approveComment = (0, errorHandler_1.asyncHandler)(async (req, res) => {
    const { id } = req.params;
    await database_1.db
        .update(schema_1.blogComments)
        .set({ isApproved: true })
        .where((0, drizzle_orm_1.eq)(schema_1.blogComments.id, Number(id)));
    res.json({
        success: true,
        message: 'Comment approved successfully'
    });
});
BlogController.deleteComment = (0, errorHandler_1.asyncHandler)(async (req, res) => {
    const { id } = req.params;
    await database_1.db
        .delete(schema_1.blogComments)
        .where((0, drizzle_orm_1.eq)(schema_1.blogComments.id, Number(id)));
    res.json({
        success: true,
        message: 'Comment deleted successfully'
    });
});
BlogController.updateCategory = (0, errorHandler_1.asyncHandler)(async (req, res) => {
    const { id } = req.params;
    const { name, slug, description } = req.body;
    if (!name || !slug) {
        return res.status(400).json({
            success: false,
            message: 'Name and slug are required'
        });
    }
    const existingCat = await database_1.db
        .select()
        .from(schema_1.blogCategories)
        .where((0, drizzle_orm_1.eq)(schema_1.blogCategories.id, Number(id)))
        .limit(1);
    if (existingCat.length === 0) {
        return res.status(404).json({
            success: false,
            message: 'Category not found'
        });
    }
    const duplicateSlug = await database_1.db
        .select()
        .from(schema_1.blogCategories)
        .where((0, drizzle_orm_1.and)((0, drizzle_orm_1.eq)(schema_1.blogCategories.slug, slug.trim()), (0, drizzle_orm_1.ne)(schema_1.blogCategories.id, Number(id))))
        .limit(1);
    if (duplicateSlug.length > 0) {
        return res.status(400).json({
            success: false,
            message: 'Category with this slug already exists'
        });
    }
    await database_1.db
        .update(schema_1.blogCategories)
        .set({
        name: name.trim(),
        slug: slug.trim(),
        description: description?.trim() || '',
        updatedAt: new Date()
    })
        .where((0, drizzle_orm_1.eq)(schema_1.blogCategories.id, Number(id)));
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
BlogController.deleteCategory = (0, errorHandler_1.asyncHandler)(async (req, res) => {
    const { id } = req.params;
    const existingCat = await database_1.db
        .select()
        .from(schema_1.blogCategories)
        .where((0, drizzle_orm_1.eq)(schema_1.blogCategories.id, Number(id)))
        .limit(1);
    if (existingCat.length === 0) {
        return res.status(404).json({
            success: false,
            message: 'Category not found'
        });
    }
    const postsWithCat = await database_1.db
        .select()
        .from(schema_1.blogPosts)
        .where((0, drizzle_orm_1.eq)(schema_1.blogPosts.categoryId, Number(id)))
        .limit(1);
    if (postsWithCat.length > 0) {
        return res.status(400).json({
            success: false,
            message: 'Cannot delete category that has posts. Please reassign or delete the posts first.'
        });
    }
    await database_1.db
        .update(schema_1.blogCategories)
        .set({
        isActive: false,
        updatedAt: new Date()
    })
        .where((0, drizzle_orm_1.eq)(schema_1.blogCategories.id, Number(id)));
    res.json({
        success: true,
        message: 'Category deleted successfully'
    });
});
BlogController.updateAuthor = (0, errorHandler_1.asyncHandler)(async (req, res) => {
    const { id } = req.params;
    const { name, bio, email, role, department, image } = req.body;
    if (!name) {
        return res.status(400).json({
            success: false,
            message: 'Name is required'
        });
    }
    const existingAuthor = await database_1.db
        .select()
        .from(schema_1.blogAuthors)
        .where((0, drizzle_orm_1.eq)(schema_1.blogAuthors.id, Number(id)))
        .limit(1);
    if (existingAuthor.length === 0) {
        return res.status(404).json({
            success: false,
            message: 'Author not found'
        });
    }
    await database_1.db
        .update(schema_1.blogAuthors)
        .set({
        name: name.trim(),
        bio: bio?.trim() || '',
        email: email?.trim() || '',
        role: role?.trim() || '',
        department: department?.trim() || '',
        image: image?.trim() || '',
        updatedAt: new Date()
    })
        .where((0, drizzle_orm_1.eq)(schema_1.blogAuthors.id, Number(id)));
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
BlogController.deleteAuthor = (0, errorHandler_1.asyncHandler)(async (req, res) => {
    const { id } = req.params;
    const existingAuthor = await database_1.db
        .select()
        .from(schema_1.blogAuthors)
        .where((0, drizzle_orm_1.eq)(schema_1.blogAuthors.id, Number(id)))
        .limit(1);
    if (existingAuthor.length === 0) {
        return res.status(404).json({
            success: false,
            message: 'Author not found'
        });
    }
    const postsWithAuthor = await database_1.db
        .select()
        .from(schema_1.blogPosts)
        .where((0, drizzle_orm_1.eq)(schema_1.blogPosts.authorId, Number(id)))
        .limit(1);
    if (postsWithAuthor.length > 0) {
        return res.status(400).json({
            success: false,
            message: 'Cannot delete author that has posts. Please reassign or delete the posts first.'
        });
    }
    await database_1.db
        .update(schema_1.blogAuthors)
        .set({
        isActive: false,
        updatedAt: new Date()
    })
        .where((0, drizzle_orm_1.eq)(schema_1.blogAuthors.id, Number(id)));
    res.json({
        success: true,
        message: 'Author deleted successfully'
    });
});
//# sourceMappingURL=blog.js.map