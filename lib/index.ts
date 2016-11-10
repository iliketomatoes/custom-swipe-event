import { CustomSwipe } from "./core";

const CustomSwipeEvent: boolean = (function(doc){
  return CustomSwipe.init(doc);
}(window.document));

export default CustomSwipeEvent;
