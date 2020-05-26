import Button from "flarum/components/Button";
import Modal from "flarum/components/Modal";

export default class TagTemplateModal extends Modal {
  init() {
    super.init();

    this.template = m.prop(this.props.tag.template());
  }
  className() {
    return "TagTemplateModal Modal--large";
  }

  title() {
    return app.translator.trans(
      "askvortsov-discussion-templates.admin.tag_template_modal.title"
    );
  }

  content() {
    return [
      <div className="Modal-body">
        <div className="Form">
          <p>
            {app.translator.trans(
              "askvortsov-discussion-templates.admin.tag_template_modal.customize_text"
            )}
          </p>
          <div className="Form-group">
            <textarea className="FormControl" rows="30" bidi={this.template} />
          </div>
          <Button
            type="submit"
            className="Button Button--primary"
            loading={this.loading}
            disabled={!this.changed()}
          >
            {app.translator.trans("askvortsov-discussion-templates.admin.tag_template_modal.submit_button")}
          </Button>
        </div>
      </div>,
    ];
  }

  changed() {
    return this.template() !== this.props.tag.template();
  }

  onsubmit(e) {
    e.preventDefault();

    const tag = this.props.tag;
    const template = this.template();

    this.loading = true;

    app
      .request({
        method: "PATCH",
        url: app.forum.attribute("apiUrl") + "/tags/" + tag.id() + "/template",
        data: { data: { template } },
      })
      .then(function () {
        tag.data.attributes.template = template;
        app.modal.close();
      });
  }
}
