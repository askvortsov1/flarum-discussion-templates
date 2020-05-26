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
          {Button.component({
            className: "Button",
            children: app.translator.trans(
              "askvortsov-discussion-templates.admin.tags.tag_template_button"
            ),
            onclick: () =>
              app.modal.show(new TagTemplateModal({ tag: this.tag })),
          })}
        </fieldset>,
        -20
      );
    }
  });
});
