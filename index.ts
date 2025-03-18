const glob = new Bun.Glob('src/**/*.txt')

let content = ''

for await (const file of glob.scan()) {
    const fileContent = await Bun.file(file).text()
    const lines = fileContent.split('\n')
    for (const line of lines) {
        if (line.startsWith('#')) {
            continue
        }
        if (line.trim().length === 0) {
            continue
        }
        content += `${line}\n`
    }
}

Bun.write('llm.txt', content)
