import { CreateSettingDto } from './dto/create-setting.dto';
import { findAllSettings, createSetting } from './settings.service';

export function createSettingRoute(createSettingDto: CreateSettingDto) {
  return createSetting(createSettingDto);
}

export function findAllSettingsRoute() {
  return findAllSettings();
}
