import { extend } from "flarum/common/extend";
import Model from "flarum/common/Model";
import Discussion from "flarum/common/models/Discussion";
import Button from "flarum/common/components/Button";
import ReplyComposer from "flarum/forum/components/ReplyComposer";
import DiscussionControls from "flarum/forum/utils/DiscussionControls";

import ReplyTemplateModal from "./components/ReplyTemplateModal";

export default function configureReplyTemplates() {
  Discussion.prototype.replyTemplate = Model.attribute("replyTemplate");
  Discussion.prototype.canManageReplyTemplates = Model.attribute(
    "canManageReplyTemplates"
  );

  extend(ReplyComposer, "initAttrs", function (_, attrs) {
    if (!attrs.originalContent) {
      attrs.originalContent = attrs.discussion.replyTemplate();
    }
  });

  extend(DiscussionControls, "userControls", function (items, discussion) {
    if (!app.session.user || !discussion.canManageReplyTemplates()) return;

    items.add(
      "reply-template",
      <Button
        icon="fas fa-reply"
        onclick={() =>
          app.modal.show(ReplyTemplateModal, {
            discussion,
          })
        }
      >
        {app.translator.trans(
          "askvortsov-discussion-templates.forum.discussion_controls.reply_template_button"
        )}
      </Button>
    );
  });
}
