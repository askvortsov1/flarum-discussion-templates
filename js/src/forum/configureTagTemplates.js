import { extend } from "flarum/extend";
import IndexPage from "flarum/components/IndexPage";
import Model from "flarum/Model";
import Tag from "flarum/tags/models/Tag";
import TagDiscussionModal from "flarum/tags/components/TagDiscussionModal";

function insertTemplate() {
  if (!app.composer.fields.tags) return;
  const original = app.composer.body.attrs.originalContent || "";
  const content = app.composer.fields.content().trim();
  if (content !== original && !app.forum.attribute("appendTemplateOnTagChange"))
    return;

  const templateCandidates = {};

  app.composer.fields.tags.forEach(function (tag) {
    if (tag.position() === null || !tag.template()) return;

    templateCandidates[tag.id()] = tag.template();
  });

  const ids = Object.keys(templateCandidates);

  if (ids.length === 2) {
    const first = app.store.getById("tags", ids[0]);
    const second = app.store.getById("tags", ids[1]);
    if (first.parent() === second) {
      delete templateCandidates[ids[1]];
    }
    if (second.parent() === first) {
      delete templateCandidates[ids[0]];
    }
  }

  if (Object.keys(templateCandidates).length === 1) {
    let template = Object.values(templateCandidates)[0];

    if (content === original) {
      app.composer.body.attrs.originalContent = template;
    } else {
      template = "\n\n" + template;
    }
    app.composer.editor.insertAtCursor(template);
  }
}

export default function configureTagTemplates() {
  Tag.prototype.template = Model.attribute("template");

  extend(IndexPage.prototype, "newDiscussionAction", function (promise) {
    promise.then((composer) => {
      if (composer.fields.tags.length > 0) {
        insertTemplate();
      } else {
        const noTagTemplate = app.forum.attribute(
          "askvortsov-discussion-templates.no_tag_template"
        );
        if (noTagTemplate) {
          composer.editor.insertAtCursor(noTagTemplate);
        }
      }
    });
  });

  extend(TagDiscussionModal.prototype, "onremove", function () {
    if (app.composer.fields.tags && app.composer.fields.tags.length > 0) {
      insertTemplate();
    }
  });
}
