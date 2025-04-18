import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:bandiwala/models/vendor_model.dart';
import 'package:bandiwala/models/product_model.dart';
import 'package:bandiwala/services/api_service.dart';
import 'package:bandiwala/widgets/product_card.dart';
import 'package:bandiwala/widgets/rating_widget.dart';

final vendorProductsProvider = FutureProvider.family<List<Product>, String>(
  (ref, vendorId) => ApiService.getVendorProducts(vendorId),
);

class VendorDetailScreen extends ConsumerWidget {
  final Vendor vendor;

  const VendorDetailScreen({required this.vendor});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final productsAsync = ref.watch(vendorProductsProvider(vendor.id));

    return Scaffold(
      appBar: AppBar(
        title: Row(
          children: [
            Text(vendor.name),
            if (vendor.isVerified)
              const Padding(
                padding: EdgeInsets.only(left: 4),
                child: Icon(Icons.verified, color: Colors.blue, size: 16),
              ),
          ],
        ),
      ),
      body: CustomScrollView(
        slivers: [
          SliverToBoxAdapter(
            child: Card(
              margin: const EdgeInsets.all(16),
              child: Padding(
                padding: const EdgeInsets.all(16),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Row(
                      children: [
                        RatingWidget(rating: vendor.averageRating),
                        const SizedBox(width: 8),
                        Text('(${vendor.ratings.length} reviews)'),
                      ],
                    ),
                    const SizedBox(height: 8),
                    Text(
                      vendor.description,
                      style: Theme.of(context).textTheme.bodyLarge,
                    ),
                    const SizedBox(height: 8),
                    Row(
                      children: [
                        const Icon(Icons.location_on, size: 16),
                        const SizedBox(width: 4),
                        Text(vendor.location.city),
                      ],
                    ),
                    const SizedBox(height: 8),
                    Row(
                      children: [
                        const Icon(Icons.phone, size: 16),
                        const SizedBox(width: 4),
                        Text(vendor.phoneNumber),
                      ],
                    ),
                  ],
                ),
              ),
            ),
          ),
          SliverToBoxAdapter(
            child: Padding(
              padding: const EdgeInsets.all(16),
              child: Text(
                'Products',
                style: Theme.of(context).textTheme.titleLarge,
              ),
            ),
          ),
          productsAsync.when(
            loading:
                () => const SliverToBoxAdapter(
                  child: Center(child: CircularProgressIndicator()),
                ),
            error:
                (err, stack) => SliverToBoxAdapter(
                  child: Center(child: Text('Error: $err')),
                ),
            data:
                (products) => SliverPadding(
                  padding: const EdgeInsets.all(16),
                  sliver: SliverGrid(
                    gridDelegate:
                        const SliverGridDelegateWithFixedCrossAxisCount(
                          crossAxisCount: 2,
                          childAspectRatio: 0.75,
                          crossAxisSpacing: 10,
                          mainAxisSpacing: 10,
                        ),
                    delegate: SliverChildBuilderDelegate(
                      (context, index) => ProductCard(
                        product: products[index],
                        onTap: () {
                          // Navigate to product detail screen
                        },
                      ),
                      childCount: products.length,
                    ),
                  ),
                ),
          ),
          if (vendor.ratings.isNotEmpty)
            SliverToBoxAdapter(
              child: Padding(
                padding: const EdgeInsets.all(16),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      'Reviews',
                      style: Theme.of(context).textTheme.titleLarge,
                    ),
                    const SizedBox(height: 8),
                    ...vendor.ratings.map(
                      (rating) => Card(
                        margin: const EdgeInsets.only(bottom: 8),
                        child: Padding(
                          padding: const EdgeInsets.all(8),
                          child: Column(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: [
                              RatingWidget(rating: rating.rating),
                              const SizedBox(height: 4),
                              Text(rating.review),
                            ],
                          ),
                        ),
                      ),
                    ),
                  ],
                ),
              ),
            ),
        ],
      ),
    );
  }
}
