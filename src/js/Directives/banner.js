// app.directive('banner', Directive);

// function Directive(BannerService) {
//     return {
//         link: function (scope, element, attrs) {
//             if (attrs.type == "banner") {
//                 // ensure id attribute exists
//                 if (!attrs.id) {
//                     console.error('modal must have an id');
//                     return;
//                 }

//                 // move element to bottom of page (just before </body>) so it can be displayed above everything else
//                 element.appendTo('body');


//                 // add self (this modal instance) to the modal service so it's accessible from controllers
//                 var modal = {
//                     id: attrs.id,
//                     open: Open,
//                     close: Close
//                 };
//                 BannerService.Add(modal);

//                 // remove self from modal service when directive is destroyed
//                 scope.$on('$destroy', function () {
//                     BannerService.Remove(attrs.id);
//                     element.remove();
//                 });


//                 // open modal
//                 function Open() {
//                     element.show();
//                     $('body').addClass('modal-open');
//                     let timeout = setTimeout(()=>Close(),600);
//                 }

//                 // close modal
//                 function Close() {
//                     element.hide();
//                     $('body').removeClass('modal-open');
//                 }
//             }
//         }
//     };
// }