import { plainToClass } from 'class-transformer';
import { CreateSettingDto } from './dto/create-setting.dto';
import { UpdateSettingDto } from './dto/update-setting.dto';
import { Setting } from './entities/setting.entity';
import settingsJson from '../db/pickbazar/settings.json';

const settings = plainToClass(Setting, settingsJson);

export function createSetting(createSettingDto: CreateSettingDto) {
  return settings;
}

export function findAllSettings() {
  return settings;
}

export function findSettingById(id: number) {
  return `This action returns a #${id} setting`;
}

export function updateSetting(id: number, updateSettingDto: UpdateSettingDto) {
  return settings;
}

export function removeSetting(id: number) {
  return `This action removes a #${id} setting`;
}
