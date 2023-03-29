import {AlterRecordingResponse} from '@smartesting/shared/dist/responses/alterRecordingResponse'

export default class Client {

    static async alteration(value: string | null, fileName: string = '', fileContent: string | ArrayBuffer | null = '', fileName2: string = '', fileContent2: string | ArrayBuffer | null = ''): Promise<AlterRecordingResponse> {
        console.log(value);
        console.log(fileName);
        console.log(fileContent);
        console.log(fileName2);
        console.log(fileContent2);

        const response = await fetch('http://localhost:3001/recording/alteration', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                scenario: value,
                fileContent: fileContent,
                fileName: fileName,
                fileContent2: fileContent2,
                fileName2: fileName2,
            })
        });
        return await response.json();

    }
}