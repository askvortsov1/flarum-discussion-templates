import { extend } from "flarum/extend";
import Model from "flarum/Model";
import Button from "flarum/components/Button";
import Tag from "flarum/tags/models/Tag";
import EditTagModal from "flarum/tags/components/EditTagModal";
import TagTemplateModal from "./components/TagTemplateModal";

app.initializers.add("askvortsov/flarum-discussion-templates", () => {
  Tag.prototype.template = Model.attribute("template");

  extend(EditTagModal.prototype, "fields", function (items) {
    if (this.tag.id()) {
      items.add(
        "tag-template-modal-button",
        <fieldset>
          <legend>
            {app.translator.trans(
              "askvortsov-discussion-templates.admin.tags.tag_template_heading"
            )}
          </legend>
          <div className="helpText">
            {app.translator.trans(
              "askvortsov-discussion-templates.admin.tags.tag_template_text"
            )}
          </div>
          <Button
            className="Button Button--primary"
            onclick={() => {
              app.modal.show(TagTemplateModal, { model: this.tag });
            }}
          >
            {app.translator.trans(
              "askvortsov-discussion-templates.admin.tags.tag_template_button"
            )}
          </Button>
        </fieldset>,
        -20
      );
    }
  });

  app.extensionData
    .for("askvortsov-discussion-templates")
    .registerPermission(
      {
        icon: "fas fa-reply",
        label: app.translator.trans(
          "askvortsov-discussion-templates.admin.permissions.manage_own_discussion_reply_templates"
        ),
        permission: "discussion.manageOwnDiscussionReplyTemplates",
      },
      "start",
      3
    )
    .registerPermission(
      {
        icon: "fas fa-reply",
        label: app.translator.trans(
          "askvortsov-discussion-templates.admin.permissions.manage_all_reply_templates"
        ),
        permission: "discussion.manageAllReplyTemplates",
      },
      "moderate",
      3
    );
});
