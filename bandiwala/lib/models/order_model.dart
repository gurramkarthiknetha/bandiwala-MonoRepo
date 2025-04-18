import 'package:bandiwala/models/product_model.dart';
import 'package:bandiwala/models/user_model.dart';
import 'package:bandiwala/models/vendor_model.dart';

class Order {
  final String id;
  final User user;
  final Vendor vendor;
  final List<OrderItem> items;
  final String status;
  final double total;
  final DateTime createdAt;

  Order({
    required this.id,
    required this.user,
    required this.vendor,
    required this.items,
    required this.status,
    required this.total,
    required this.createdAt,
  });

  factory Order.fromJson(Map<String, dynamic> json) {
    return Order(
      id: json['_id'],
      user: User.fromJson(json['user']),
      vendor: Vendor.fromJson(json['vendor']),
      items:
          (json['items'] as List)
              .map((item) => OrderItem.fromJson(item))
              .toList(),
      status: json['status'],
      total: json['total'].toDouble(),
      createdAt: DateTime.parse(json['createdAt']),
    );
  }
}

class OrderItem {
  final Product product;
  final int quantity;
  final double price;

  OrderItem({
    required this.product,
    required this.quantity,
    required this.price,
  });

  factory OrderItem.fromJson(Map<String, dynamic> json) {
    return OrderItem(
      product: Product.fromJson(json['product']),
      quantity: json['quantity'],
      price: json['price'].toDouble(),
    );
  }
}
