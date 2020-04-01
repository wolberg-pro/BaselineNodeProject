import { HttpError } from 'routing-controllers';

export class SettingContextJsonParseError extends HttpError {
    constructor(key: string , context: string) {
        super(500, `Setting '${key}' with contextJSON '${context}' Result with error please check`);
    }
}
