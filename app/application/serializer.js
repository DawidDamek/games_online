import RESTSerializer from '@ember-data/serializer/rest';
import LocalStorageSerializer from 'ember-local-storage/serializers/serializer';
import ENV from 'games-online/config/environment';

const isTesting = ENV.environment === 'test';

const Adapter = isTesting ? RESTSerializer : LocalStorageSerializer;

export default class ApplicationAdapter extends Adapter {}
