import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:bandiwala/services/api_service.dart';
import 'package:bandiwala/screens/admin/user_manage_screen.dart';
import 'package:bandiwala/screens/admin/vendor_manage_screen.dart';

class AdminDashboard extends ConsumerWidget {
  @override
  Widget build(BuildContext context, WidgetRef ref) {
    return DefaultTabController(
      length: 2,
      child: Scaffold(
        appBar: AppBar(
          title: const Text('Admin Dashboard'),
          bottom: const TabBar(
            tabs: [Tab(text: 'Vendors'), Tab(text: 'Users')],
          ),
        ),
        body: TabBarView(children: [VendorManageScreen(), UserManageScreen()]),
      ),
    );
  }
}
