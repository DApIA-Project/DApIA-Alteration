import { AlterationAPI } from '../api/AlterationAPI'
import commander from 'commander'
import fs from 'fs'

class Main {
  public static main(args: string[]): void {
    if (args.length > 0) {
      console.log('main')
      Main.alterRecording(args, args[0], args[1])
    }
  }

  private static alterRecording(
    args: string[],
    incidentFilePath: string
  ): void {
    Main.extracted(args, incidentFilePath, './public', false, '')
  }

  private static alterRecording(
    args: string[],
    incidentFilePath: string,
    file_name: string
  ): void {
    const file_name_without_ext = file_name.replace(/[.][^.]+$/, '')
    Main.extracted(
      args,
      incidentFilePath,
      './temp',
      true,
      file_name_without_ext
    )
  }

  private static extracted(
    args: string[],
    incidentFilePath: string,
    pathname: string,
    logResults: boolean,
    suffix: string
  ): void {
    const incidentFileExists = fs.existsSync(incidentFilePath)
    console.log(incidentFileExists)
    if (incidentFileExists) {
      const incidentFileStats = fs.statSync(incidentFilePath)
      console.log(incidentFileStats.isFile())
      if (incidentFileStats.isFile()) {
        console.log('alterRecording')

        const program = new commander.Command()
        program.parse(args)
        const commandLine = program.opts()

        AlterationAPI.startAlteration(pathname, incidentFilePath, {
          labeled: false,
          logResults: logResults,
          commandLine: commandLine,
          prefix: 'modified',
          suffix: suffix,
        })
      }
    }
  }
}

Main.main(process.argv.slice(2))
