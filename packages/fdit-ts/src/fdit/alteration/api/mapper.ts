import { Builder, parseStringPromise } from 'xml2js'

export class XmlMapper {
  public static async parse(xmlString: string): Promise<any> {
    return await parseStringPromise(xmlString)
  }

  public static serialize(obj: any): string {
    const builder = new Builder() //
    return builder.buildObject(obj)
  }
}

export class JsonMapper {
  public static parse(jsonString: string): any {
    return JSON.parse(jsonString)
  }

  public static serialize(obj: any): string {
    return JSON.stringify(obj)
  }
}
