<?php

namespace Askvortsov\FlarumDiscussionTemplates\Listener;

use Flarum\Api\Event\Serializing;
use Flarum\Settings\SettingsRepositoryInterface;
use Flarum\Tags\Api\Serializer\TagSerializer;
use Illuminate\Contracts\Events\Dispatcher;

class AddTemplateToTagSerializer
{
    /**
     * @var SettingsRepositoryInterface
     */
    protected $settings;

    public function __construct(SettingsRepositoryInterface $settings)
    {
        $this->settings = $settings;
    }

    public function subscribe(Dispatcher $events)
    {
        $events->listen(Serializing::class, [$this, 'addTemplate']);
    }

    /**
     * @param Serializing $event
     */
    public function addTemplate(Serializing $event)
    {
        if ($event->isSerializer(TagSerializer::class)) {
            $event->attributes['template'] = $event->model->template;
        }
    }
}
