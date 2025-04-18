import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:bandiwala/models/product_model.dart';
import 'package:bandiwala/services/api_service.dart';
import 'package:bandiwala/services/auth_service.dart';
import 'package:bandiwala/widgets/rating_widget.dart';
import 'package:carousel_slider/carousel_slider.dart';

class ProductDetailScreen extends ConsumerStatefulWidget {
  final Product product;

  const ProductDetailScreen({required this.product});

  @override
  _ProductDetailScreenState createState() => _ProductDetailScreenState();
}

class _ProductDetailScreenState extends ConsumerState<ProductDetailScreen> {
  int _quantity = 1;
  int _currentImageIndex = 0;

  void _incrementQuantity() {
    setState(() => _quantity++);
  }

  void _decrementQuantity() {
    if (_quantity > 1) {
      setState(() => _quantity--);
    }
  }

  @override
  Widget build(BuildContext context) {
    final user = ref.watch(authServiceProvider).value;

    return Scaffold(
      appBar: AppBar(title: Text(widget.product.name)),
      body: SingleChildScrollView(
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            if (widget.product.images.isNotEmpty) ...[
              CarouselSlider(
                options: CarouselOptions(
                  height: 300,
                  viewportFraction: 1,
                  onPageChanged: (index, reason) {
                    setState(() => _currentImageIndex = index);
                  },
                ),
                items:
                    widget.product.images.map((url) {
                      return Image.network(
                        url,
                        fit: BoxFit.cover,
                        width: double.infinity,
                        errorBuilder:
                            (context, error, stackTrace) =>
                                const Icon(Icons.error, size: 50),
                      );
                    }).toList(),
              ),
              if (widget.product.images.length > 1)
                Row(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children:
                      widget.product.images.asMap().entries.map((entry) {
                        return Container(
                          width: 8,
                          height: 8,
                          margin: const EdgeInsets.symmetric(
                            vertical: 8,
                            horizontal: 4,
                          ),
                          decoration: BoxDecoration(
                            shape: BoxShape.circle,
                            color: Colors.blue.withOpacity(
                              _currentImageIndex == entry.key ? 0.9 : 0.4,
                            ),
                          ),
                        );
                      }).toList(),
                ),
            ],
            Padding(
              padding: const EdgeInsets.all(16),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      Text(
                        '₹${widget.product.price}',
                        style: const TextStyle(
                          fontSize: 24,
                          fontWeight: FontWeight.bold,
                          color: Colors.green,
                        ),
                      ),
                      Row(
                        children: [
                          RatingWidget(rating: widget.product.rating),
                          const SizedBox(width: 4),
                          Text(
                            '(${widget.product.reviewCount})',
                            style: Theme.of(context).textTheme.bodySmall,
                          ),
                        ],
                      ),
                    ],
                  ),
                  const SizedBox(height: 16),
                  Text(
                    widget.product.description,
                    style: Theme.of(context).textTheme.bodyLarge,
                  ),
                  const SizedBox(height: 24),
                  if (user != null) ...[
                    Row(
                      children: [
                        IconButton(
                          onPressed: _decrementQuantity,
                          icon: const Icon(Icons.remove),
                        ),
                        Container(
                          padding: const EdgeInsets.symmetric(horizontal: 16),
                          child: Text(
                            '$_quantity',
                            style: const TextStyle(fontSize: 18),
                          ),
                        ),
                        IconButton(
                          onPressed: _incrementQuantity,
                          icon: const Icon(Icons.add),
                        ),
                      ],
                    ),
                    const SizedBox(height: 16),
                    SizedBox(
                      width: double.infinity,
                      child: ElevatedButton(
                        onPressed: () async {
                          try {
                            await ApiService.addToCart(
                              user.id,
                              widget.product.id,
                              _quantity,
                            );
                            ref.refresh(authServiceProvider);
                            if (mounted) {
                              ScaffoldMessenger.of(context).showSnackBar(
                                const SnackBar(
                                  content: Text('Added to cart'),
                                  duration: Duration(seconds: 1),
                                ),
                              );
                              Navigator.pop(context);
                            }
                          } catch (e) {
                            if (mounted) {
                              ScaffoldMessenger.of(context).showSnackBar(
                                SnackBar(content: Text('Error: $e')),
                              );
                            }
                          }
                        },
                        child: const Padding(
                          padding: EdgeInsets.all(16),
                          child: Text(
                            'Add to Cart',
                            style: TextStyle(fontSize: 16),
                          ),
                        ),
                      ),
                    ),
                  ],
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }
}
