"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const seed_js_1 = require("./database/seed.js");
(0, seed_js_1.seedDatabase)()
    .then(() => {
    console.log('✅ Database seeding completed successfully!');
    process.exit(0);
})
    .catch((error) => {
    console.error('❌ Database seeding failed:', error);
    process.exit(1);
});
//# sourceMappingURL=seed.js.map