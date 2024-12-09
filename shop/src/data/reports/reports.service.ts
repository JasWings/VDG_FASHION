import { MyReports } from './entities/report.entity';
import { plainToClass } from 'class-transformer';
import reportJSON from '../db/pickbazar/reports.json';
const myReports = plainToClass(MyReports, reportJSON);
const myReportsData: MyReports[] = myReports

export function findMyReports(): { data: MyReports[] } {
  return {
    data: myReportsData,
  };
}
