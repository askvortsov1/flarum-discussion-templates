import { extend } from "flarum/extend";
import IndexPage from "flarum/components/IndexPage";
import Model from "flarum/Model";
import Tag from "flarum/tags/models/Tag";
import TagDiscussionModal from "flarum/tags/components/TagDiscussionModal";

function insertTemplate() {
  if (app.composer.component.content()) return;

  const templateCandidates = {};

  app.composer.component.tags.forEach(function (tag) {
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
    app.composer.component.editor.value(Object.values(templateCandidates)[0]);
  }
}

app.initializers.add("askvortsov/flarum-discussion-templates", () => {
  Tag.prototype.template = Model.attribute("template");

  extend(IndexPage.prototype, "newDiscussionAction", function (promise) {
    promise.then((component) => {
      if (component.tags.length > 0) {
        insertTemplate();
      }
    });
  });

  extend(TagDiscussionModal.prototype, "onhide", function () {
    if (app.composer.component.tags.length > 0) {
      insertTemplate();
    }
  });
});
