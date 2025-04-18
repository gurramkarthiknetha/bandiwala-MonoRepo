class Product {
  final String id;
  final String name;
  final String description;
  final double price;
  final List<String> images;
  final String vendorId;
  final double rating;
  final int reviewCount;
  final List<Review> reviews;
  final bool isAvailable;

  Product({
    required this.id,
    required this.name,
    required this.description,
    required this.price,
    required this.images,
    required this.vendorId,
    required this.rating,
    required this.reviewCount,
    required this.reviews,
    required this.isAvailable,
  });

  factory Product.fromJson(Map<String, dynamic> json) {
    return Product(
      id: json['_id'],
      name: json['name'],
      description: json['description'],
      price: json['price'].toDouble(),
      images: List<String>.from(json['images'] ?? []),
      vendorId: json['vendorId'],
      rating: json['rating']?.toDouble() ?? 0.0,
      reviewCount: json['reviewCount'] ?? 0,
      reviews:
          (json['reviews'] as List?)
              ?.map((review) => Review.fromJson(review))
              .toList() ??
          [],
      isAvailable: json['isAvailable'] ?? true,
    );
  }

  Map<String, dynamic> toJson() => {
    'name': name,
    'description': description,
    'price': price,
    'images': images,
    'vendorId': vendorId,
    'isAvailable': isAvailable,
  };
}

class Review {
  final String userId;
  final String username;
  final double rating;
  final String comment;
  final DateTime createdAt;

  Review({
    required this.userId,
    required this.username,
    required this.rating,
    required this.comment,
    required this.createdAt,
  });

  factory Review.fromJson(Map<String, dynamic> json) {
    return Review(
      userId: json['userId'],
      username: json['username'],
      rating: json['rating'].toDouble(),
      comment: json['comment'],
      createdAt: DateTime.parse(json['createdAt']),
    );
  }

  Map<String, dynamic> toJson() => {
    'userId': userId,
    'username': username,
    'rating': rating,
    'comment': comment,
  };
}
