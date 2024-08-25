function MdToHTML(markdown) {
    let html = '';
    let lines = markdown.split('\n');
    let inParagraph = false;
    let inList = false;
    let listItemCount = 0;
    let inCodeBlock = false;
    let codeContent = '';
    let codeLanguage = '';

    for (let line of lines) {
        if (line.startsWith('#')) {
            let headingLevel = line.match(/^#+/).length;
            html += `<h${headingLevel}>${line.slice(headingLevel).trim()}</h${headingLevel}>`;
        } else if (line.startsWith('* ')) {
            if (!inList) {
                inList = true;
                html += '<ul>';
            }
            listItemCount++;
            html += `<li>${line.slice(2).trim()}</li>`;
        } else if (line.startsWith('```')) {
            if (inCodeBlock) {
                // 使用 Prism.js 进行代码高亮
                const highlightedCode = Prism.highlight(codeContent, Prism.languages[codeLanguage], codeLanguage);
                const codeSpan = `<span class="gl code-${codeLanguage}">${highlightedCode}</span>`;
                html += codeSpan;
                codeContent = '';
                inCodeBlock = false;
                codeLanguage = '';
            } else {
                inCodeBlock = true;
                codeLanguage = line.slice(3).trim();
            }
        } else if (inCodeBlock) {
            codeContent += line + '\n';
        } else if (line.trim() === '') {
            if (inParagraph) {
                html += '</p>';
                inParagraph = false;
            }
            if (inList && listItemCount > 0) {
                html += '</ul>';
                inList = false;
                listItemCount = 0;
            }
        } else {
            if (!inParagraph) {
                inParagraph = true;
                html += '<p>';
            }
            html += line.trim() + ' ';
        }
    }

    if (inParagraph) {
        html += '</p>';
    }
    if (inList && listItemCount > 0) {
        html += '</ul>';
    }

    return html;
}
