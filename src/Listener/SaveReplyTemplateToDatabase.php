<?php

namespace Askvortsov\FlarumDiscussionTemplates\Listener;

use Flarum\Discussion\Event\Saving;
use Illuminate\Support\Arr;

class SaveReplyTemplateToDatabase
{
    public function handle(Saving $event)
    {
        $discussion = $event->discussion;
        $data = $event->data;
        $actor = $event->actor;

        $attributes = Arr::get($data, 'attributes', []);

        if (isset($attributes['replyTemplate'])) {
            $actor->assertCan('manageReplyTemplates', $discussion);

            $discussion->replyTemplate = $attributes['replyTemplate'];
        }
    }
}
