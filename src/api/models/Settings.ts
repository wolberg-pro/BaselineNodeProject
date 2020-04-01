import { Column, Entity, PrimaryColumn} from 'typeorm';
import {SettingContextJsonParseError} from '../errors/SettingContextJsonParseError';

@Entity({name: 'settings'})
export class Settings {
    @PrimaryColumn({ name: 'key' })
    public key: string;

    @Column({ name: 'description' })
    public description: string;

    @Column({ name: 'contextJSON' })
    public contextJSON: string;

    @Column({ name: 'context' })
    public context: string;

    /**
     * will get the correct context of the key what ever need return json object or string
     * @throws SettingContextJsonParseError
     * @return string|JSON
     */
    public getContext(): string|JSON {
        try {
            if (this.contextJSON && this.contextJSON === '') {
                return JSON.parse(this.contextJSON);
            } else {
                return this.context;
            }
        } catch (e) {
            throw new SettingContextJsonParseError(this.key , this.contextJSON);
        }
    }
    public toString(): string {
        return `${this.key} - ${this.description}`;
    }

}
