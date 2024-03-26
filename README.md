# Carmouche Jewelers

Client was unsatisfied by prior service from competetor. Looking to improve design. No longer wants e-commernce due to lack of e-sales. Wants an updated layout and the ability to display products. Design philosophy is to develop e-commerce but not intergrate it functionally unless the client ever changes their mind. Personally thinking to just have the same layout, but minor adjustments to the backend if the customer or I ever want to update it later or another coder works on the project in the future (easier for everyone involved). Using a previous project as a template/skeleton to build off of for time constraints. 

# BackEnd Schema

Main Collections
Products

Collection: products
Document: {product_id} (unique identifier for each product)
Fields:
name: string (name of the product)
category: string (e.g., "Rings", "Necklaces")
designer: string (optional, name of the designer)
price: number (price of the product)
description: string (description of the product)
imageUrls: array of strings (URLs of product images stored in Firebase Storage)
featured: boolean (true if it's a featured product)
newArrival: boolean (true if it's a new arrival)
onSale: boolean (true if it's on sale)
tags: array of strings (useful for search and categorization)
details: map/object (additional details like material, size, color, etc.)
Categories

Collection: categories
Document: {category_name} (e.g., "Rings", "Necklaces")
Fields:
description: string (description of the category)
featuredImageUrl: string (URL of an image representing the category, stored in Firebase Storage)
Designers

Collection: designers
Document: {designer_name}
Fields:
bio: string (biography or description of the designer)
featuredImageUrl: string (URL of an image representing the designer, stored in Firebase Storage)
Orders (if managing orders through Firestore)

Collection: orders
Document: {order_id}
Fields:
customer_id: string
products: array of maps/objects (product_id, quantity, price)
totalPrice: number
orderDate: timestamp
status: string (e.g., "processing", "shipped")
Users (if managing user accounts)

Collection: users
Document: {user_id}
Fields:
name: string
email: string
address: map/object (street, city, state, zip)
orderIds: array of strings (order_ids)
Design Considerations
Image Storage: Images are stored in Firebase Storage. Store the URL references in Firestore for easy retrieval.
Normalization vs. Denormalization: Firestore is a NoSQL database, so consider denormalizing data for more efficient querying, while maintaining data integrity.
Indexes: Create indexes for commonly queried fields to improve query performance.
Security: Secure access to data and images using Firestore Security Rules and Firebase Storage Security Rules.
Scalability: Plan for scaling by optimizing data structures, queries, and indexes.
