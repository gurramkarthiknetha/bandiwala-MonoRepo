import 'package:bandiwala/screens/auth/login_screen.dart';
import 'package:bandiwala/screens/user/home_screen.dart';
import 'package:flutter/material.dart';

class BandiwalaWelcomeScreen extends StatelessWidget {
  const BandiwalaWelcomeScreen({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Container(
        color: const Color(0xFFEFBE42), // Yellow/gold background color
        child: Column(
          children: [
            Expanded(
              child: Stack(
                alignment: Alignment.bottomCenter,
                children: [
                  // Main image with chefs
                  Positioned.fill(
                    child: Image.asset(
                      'lib/assets/images/bandi.webp',
                      fit: BoxFit.cover,
                    ),
                  ),

                  // Logo overlay at bottom
                  Positioned(
                    bottom: 100,
                    child: Container(
                      width: 200,
                      height: 200,
                      padding: const EdgeInsets.all(
                        12,
                      ), // spacing around the logo
                      decoration: const BoxDecoration(
                        // color: Color(0xFFEFBE42), // same yellow background
                        shape: BoxShape.circle,
                      ),
                      child: Container(
                        decoration: BoxDecoration(
                          shape: BoxShape.circle,
                          border: Border.all(color: Colors.black, width: 2.5),
                        ),
                        child: ClipOval(
                          child: Image.asset(
                            'lib/assets/images/bandi_logo.webp',
                            fit: BoxFit.cover,
                          ),
                        ),
                      ),
                    ),
                  ),

                  // Get Started button
                  Positioned(
                    bottom: 30,
                    child: SizedBox(
                      width: 200,
                      height: 50,
                      child: ElevatedButton(
                        onPressed: () {
                          // Navigate to the next screen
                          Navigator.of(context).push(
                            MaterialPageRoute(
                              builder: (context) =>
                                  HomeScreen(), // Replace with your next screen
                            ),
                          );
                        },
                        style: ElevatedButton.styleFrom(
                          backgroundColor: const Color(
                            0xFFD7633F,
                          ), // Orange/rust button color
                          foregroundColor: Colors.white,
                          shape: RoundedRectangleBorder(
                            borderRadius: BorderRadius.circular(30),
                          ),
                        ),
                        child: const Text(
                          'Get Started',
                          style: TextStyle(
                            fontSize: 18,
                            fontWeight: FontWeight.w500,
                          ),
                        ),
                      ),
                    ),
                  ),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }
}
