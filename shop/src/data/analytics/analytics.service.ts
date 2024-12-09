import analyticsJson from "../db/pickbazar/analytics.json";
import { plainToClass } from 'class-transformer';
import { Analytics } from './entities/analytics.entity';

const analytics = plainToClass(Analytics, analyticsJson);

export function findAllAnalytics() {
  return analytics;
}
