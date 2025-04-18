class User {
  final String id;
  final String username;
  final String email;
  final String phoneNumber;
  final String address;
  final List<CartItem> cart;
  final String? token;

  User({
    required this.id,
    required this.username,
    required this.email,
    required this.phoneNumber,
    required this.address,
    required this.cart,
    this.token,
  });

  factory User.fromJson(Map<String, dynamic> json) {
    return User(
      id: json['_id'],
      username: json['username'],
      email: json['email'],
      phoneNumber: json['phoneNumber'],
      address: json['address'],
      cart:
          (json['cart'] as List?)
              ?.map((item) => CartItem.fromJson(item))
              .toList() ??
          [],
      token: json['token'],
    );
  }

  Map<String, dynamic> toJson() => {
    'username': username,
    'email': email,
    'phoneNumber': phoneNumber,
    'address': address,
  };
}

class CartItem {
  final String productId;
  final int quantity;

  CartItem({required this.productId, required this.quantity});

  factory CartItem.fromJson(Map<String, dynamic> json) {
    return CartItem(productId: json['productId'], quantity: json['quantity']);
  }

  Map<String, dynamic> toJson() => {
    'productId': productId,
    'quantity': quantity,
  };
}
