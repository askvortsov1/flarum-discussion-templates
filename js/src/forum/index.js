import configureReplyTemplates from "./configureReplyTemplates";
import configureTagTemplates from "./configureTagTemplates";

app.initializers.add("askvortsov/flarum-discussion-templates", () => {
  configureReplyTemplates();
  configureTagTemplates();
});
