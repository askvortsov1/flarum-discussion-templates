import { extend } from "flarum/extend";
import IndexPage from "flarum/components/IndexPage";
import Model from "flarum/Model";
import Tag from "flarum/tags/models/Tag";
import TagDiscussionModal from "flarum/tags/components/TagDiscussionModal";

function insertTemplate() {
  if (app.composer.fields.content() || !app.composer.fields.tags) return;

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
    const template = Object.values(templateCandidates)[0];
    app.composer.editor.setValue(template);
  }
}

app.initializers.add("askvortsov/flarum-discussion-templates", () => {
  Tag.prototype.template = Model.attribute("template");

  extend(IndexPage.prototype, "newDiscussionAction", function (promise) {
    promise.then((composer) => {
      if (composer.fields.tags.length > 0) {
        insertTemplate();
      }
    });
  });

  extend(TagDiscussionModal.prototype, "onremove", function () {
    if (app.composer.fields.tags && app.composer.fields.tags.length > 0) {
      insertTemplate();
    }
  });
});
