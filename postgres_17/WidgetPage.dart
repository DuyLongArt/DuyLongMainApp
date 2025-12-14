import 'package:flutter/material.dart';
import 'package:notion_2/data_layer/ExternalWidget.dart';
import 'package:notion_2/data_layer/ExternalWidgetImage.dart';
import 'package:notion_2/router_layer/url_route/AddWidgetDatabase.dart';
import 'package:notion_2/ui_layer/WidgetFormData.dart';
import 'package:url_launcher/url_launcher.dart';

// --- Giả Định Cần Thiết ---
// 1. Giả định ExternalWidget has the required fields: name, roleType, type.
// 2. Giả định ExternalWidget has a getter/method 'finalURL()' to get the full URL.
// 3. Giả định ExternalWidgetImage accepts a full image URL.
// -------------------------

class WidgetPage extends StatelessWidget {
   
  final List<ExternalWidget> externalWidgetList; 
  
  // 1. FIXED CONSTRUCTOR: Correctly initialize the final field using the initializer list.
  WidgetPage({
    super.key,
    // Tham số đầu vào tùy chọn (nullable)
    List<ExternalWidget>? externalWidgetList,
  }) : 
    // Initialization list must use the correct syntax for the default value
    externalWidgetList = externalWidgetList ?? List.generate(
      7, 
      (index) {
        final id = index + 1;
        
        return ExternalWidget(
          url: "watch?v=lA_o1dvXCU8&list=RDlA_o1dvXCU8&index=$id",
          imageUrl: "https://picsum.photos/id/${100 + id}/200/300", 
          dateAdded: DateTime.now().subtract(Duration(days: id)), 
          widgetID: "EW$id", 
          host: (id % 2 == 0) ? "www.google.com" : "www.youtube.com", 
          protocol: "https",
          port: 443, 
          ipAddress: null,
          
          // ADDED REQUIRED FIELDS (mocked)
          name: "Video Player $id", 
       
        );
      },
    );

  // 2. FIXED Method Name: Corrected spelling to '_navigateExternalUrl'
  void _navigateExternalUrl(String url) async {
    final uri = Uri.parse(url);
    
    if (await canLaunchUrl(uri)) {
      await launchUrl(uri);
    } else {
      debugPrint('Could not launch $url');
    }
  }
  // void __addWidgetDatabase(String)
 // Modify your _openPopupForm method in WidgetPage:
void _openPopupForm(BuildContext context){
  showGeneralDialog(
    context: context,
    transitionDuration: const Duration(milliseconds: 300),
    barrierDismissible: true,
    barrierLabel: 'Dismiss',
    
    transitionBuilder: (context, animation, secondaryAnimation, child) {
      // 1. Scale Transition: Defines the "pop" effect.
      // We use reverseCurve: Curves.easeIn to make the exit (pop) animation fast.
      final scaleAnimation = CurvedAnimation(
          parent: animation,
          curve: Curves.easeOut,     // Grow smoothly on entry
          reverseCurve: Curves.easeIn // Shrink quickly on exit (the pop)
      );

      // 2. Opacity Transition: Ensures it fades out.
      final fadeAnimation = Tween<double>(begin: 0.0, end: 1.0).animate(animation);

      return FadeTransition(
          opacity: fadeAnimation,
          child: ScaleTransition(
              scale: scaleAnimation,
              child: child,
          ),
      );
    },

    pageBuilder: (context, animation, secondaryAnimation) {
      return AddWidgetFormWidget(); 
    },
  );
}
      // 3. DEFINE THE DIALOG CONTENT
      
  Widget build(BuildContext context) {
    // 3. Build a single list containing all grid items
    // Start with the list of generated widgets
    List<Widget> gridItems = List.generate(externalWidgetList.length, (index) {
      final widgetData = externalWidgetList[index]; 
      
      // Assuming widgetData.finalURL() is a method, not a getter.
      final String fullUrl = widgetData.finalURL(); 
      
      // Assuming widgetData.imageUrl contains the full image URL.
      // If it only contains the path, you must build the full URL here.
      final String imageSource = widgetData.host; 

      return Container(
        color: const Color.fromARGB(255, 80, 67, 199),
        child: Center(
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              Text(
                'Widget: ${widgetData.widgetID}',
                style: const TextStyle(color: Colors.white, fontSize: 14),
              ),
              const SizedBox(height: 8),
              // Ensure ExternalWidgetImage is used correctly
              ExternalWidgetImage(fullImageUrl: imageSource),
              const SizedBox(height: 8),
              TextButton(
                onPressed: () => _navigateExternalUrl(fullUrl), 
                child: const Text("Click here", style: TextStyle(color: Colors.yellow)),
              )
            ],
          ),
        ),
      );
    });
    
    // 4. Append the "Add" button container to the list
    gridItems.add(
      Container(
        color: Colors.grey[200],
        child: Center(
          child: IconButton(
            onPressed: ()=>_openPopupForm(context), 
            icon: const Icon(Icons.add_circle, size: 50, color: Colors.blue),
          ),
        ),
      ),
    );


    // 5. FIXED GridView children structure
    return Scaffold(
      appBar: AppBar(
        title: const Text('Widget List'),
        backgroundColor: Theme.of(context).colorScheme.inversePrimary,
      ),
      body: GridView.count(
        crossAxisCount: 3, 
        padding: const EdgeInsets.all(10),
        crossAxisSpacing: 10,
        mainAxisSpacing: 10,
        
        // Pass the single, combined list of widgets
        children: gridItems, 
      ),
    );
  }
}