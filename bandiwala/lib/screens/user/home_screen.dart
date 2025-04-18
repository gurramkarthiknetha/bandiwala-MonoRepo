import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:bandiwala/models/product_model.dart';
import 'package:bandiwala/models/vendor_model.dart';
import 'package:bandiwala/services/api_service.dart';
import 'package:bandiwala/services/auth_service.dart';
import 'package:bandiwala/widgets/product_card.dart';
import 'package:bandiwala/screens/user/cart_screen.dart';
import 'package:bandiwala/screens/user/vendor_list_screen.dart';

final productsProvider = FutureProvider((ref) => ApiService.getProducts());
final vendorsProvider = FutureProvider((ref) => ApiService.getVendors());

class HomeScreen extends ConsumerWidget {
  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final productsAsync = ref.watch(productsProvider);
    final vendorsAsync = ref.watch(vendorsProvider);
    final user = ref.watch(authServiceProvider).value;

    return Scaffold(
      appBar: AppBar(
        title: const Text('Brndiwale'),
        actions: [
          IconButton(
            icon: const Icon(Icons.shopping_cart),
            onPressed:
                () => Navigator.push(
                  context,
                  MaterialPageRoute(builder: (context) => CartScreen()),
                ),
          ),
          IconButton(
            icon: const Icon(Icons.logout),
            onPressed: () {
              ref.read(authServiceProvider.notifier).logout();
            },
          ),
        ],
      ),
      body: RefreshIndicator(
        onRefresh: () async {
          ref.refresh(productsProvider);
          ref.refresh(vendorsProvider);
        },
        child: CustomScrollView(
          slivers: [
            // Vendors Section
            SliverToBoxAdapter(
              child: Padding(
                padding: const EdgeInsets.all(16),
                child: Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    const Text(
                      'Popular Vendors',
                      style: TextStyle(
                        fontSize: 20,
                        fontWeight: FontWeight.bold,
                      ),
                    ),
                    TextButton(
                      onPressed:
                          () => Navigator.push(
                            context,
                            MaterialPageRoute(
                              builder: (context) => VendorListScreen(),
                            ),
                          ),
                      child: const Text('View All'),
                    ),
                  ],
                ),
              ),
            ),
            vendorsAsync.when(
              loading:
                  () => const SliverToBoxAdapter(
                    child: Center(child: CircularProgressIndicator()),
                  ),
              error:
                  (err, stack) => SliverToBoxAdapter(
                    child: Center(child: Text('Error: $err')),
                  ),
              data:
                  (vendors) => SliverToBoxAdapter(
                    child: SizedBox(
                      height: 130,
                      child: ListView.builder(
                        scrollDirection: Axis.horizontal,
                        padding: const EdgeInsets.symmetric(horizontal: 16),
                        itemCount: vendors.length,
                        itemBuilder: (context, index) {
                          final vendor = vendors[index];
                          return Card(
                            margin: const EdgeInsets.only(right: 16),
                            child: InkWell(
                              onTap: () {
                                // Navigate to vendor detail screen
                              },
                              child: SizedBox(
                                width: 200,
                                child: Padding(
                                  padding: const EdgeInsets.all(8.0),
                                  child: Column(
                                    crossAxisAlignment:
                                        CrossAxisAlignment.start,
                                    children: [
                                      Text(
                                        vendor.name,
                                        style: const TextStyle(
                                          fontWeight: FontWeight.bold,
                                          fontSize: 16,
                                        ),
                                      ),
                                      Text(
                                        vendor.description,
                                        maxLines: 2,
                                        overflow: TextOverflow.ellipsis,
                                      ),
                                      const Spacer(),
                                      Row(
                                        children: [
                                          Icon(
                                            Icons.star,
                                            size: 16,
                                            color: Colors.amber,
                                          ),
                                          Text(
                                            ' ${vendor.averageRating.toStringAsFixed(1)}',
                                            style:
                                                Theme.of(
                                                  context,
                                                ).textTheme.bodySmall,
                                          ),
                                        ],
                                      ),
                                    ],
                                  ),
                                ),
                              ),
                            ),
                          );
                        },
                      ),
                    ),
                  ),
            ),

            // Products Section
            SliverToBoxAdapter(
              child: Padding(
                padding: const EdgeInsets.all(16),
                child: Text(
                  'All Products',
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
          ],
        ),
      ),
    );
  }
}
