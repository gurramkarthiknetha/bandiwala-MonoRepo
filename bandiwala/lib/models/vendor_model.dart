class Vendor {
  final String id;
  final String name;
  final String email;
  final String phoneNumber;
  final String description;
  final Location location;
  final List<String> products;
  final bool isVerified;
  final List<Rating> ratings;
  final double averageRating;

  Vendor({
    required this.id,
    required this.name,
    required this.email,
    required this.phoneNumber,
    required this.description,
    required this.location,
    required this.products,
    required this.isVerified,
    required this.ratings,
    required this.averageRating,
  });

  factory Vendor.fromJson(Map<String, dynamic> json) {
    return Vendor(
      id: json['_id'],
      name: json['name'],
      email: json['email'],
      phoneNumber: json['phoneNumber'],
      description: json['description'],
      location: Location.fromJson(json['location']),
      products: List<String>.from(json['products'] ?? []),
      isVerified: json['isVerified'] ?? false,
      ratings:
          (json['ratings'] as List?)?.map((r) => Rating.fromJson(r)).toList() ??
          [],
      averageRating: json['averageRating']?.toDouble() ?? 0.0,
    );
  }

  Map<String, dynamic> toJson() => {
    'name': name,
    'email': email,
    'phoneNumber': phoneNumber,
    'description': description,
    'location': location.toJson(),
  };
}

class Location {
  final String city;
  final double latitude;
  final double longitude;

  Location({
    required this.city,
    required this.latitude,
    required this.longitude,
  });

  factory Location.fromJson(Map<String, dynamic> json) {
    return Location(
      city: json['city'],
      latitude: json['latitude'].toDouble(),
      longitude: json['longitude'].toDouble(),
    );
  }

  Map<String, dynamic> toJson() => {
    'city': city,
    'latitude': latitude,
    'longitude': longitude,
  };
}

class Rating {
  final String userId;
  final double rating;
  final String review;

  Rating({required this.userId, required this.rating, required this.review});

  factory Rating.fromJson(Map<String, dynamic> json) {
    return Rating(
      userId: json['userId'],
      rating: json['rating'].toDouble(),
      review: json['review'],
    );
  }
}
