function MdToHTML(markdown) {
      let html = '';
      const lines = markdown.split('\n');
      let isParagraph = false;
      let isList = false;
      let listItemCount = 0;
      let isCodeBlock = false;
      let codeContent = '';

      for (const line of lines) {
        if (line.startsWith('#')) {
          const headingLevel = line.match(/^#+/).length;
          html += `<h${headingLevel}>${line.slice(headingLevel).trim()}</h${headingLevel}>`;
        } else if (line.startsWith('* ')) {
          if (!isList) {
            isList = true;
            html += '<ul>';
          }
          listItemCount++;
          html += `<li>${line.slice(2).trim()}</li>`;
        } else if (line.startsWith('```')) {
          if (isCodeBlock) {
            html += `<pre><code>${codeContent}</code></pre>`;
            codeContent = '';
            isCodeBlock = false;
          } else {
            isCodeBlock = true;
          }
        } else if (isCodeBlock) {
          codeContent += line + '\n';
        } else if (line.trim() === '') {
          if (isParagraph) {
            html += '</p>';
            isParagraph = false;
          }
          if (isList && listItemCount > 0) {
            html += '</ul>';
            isList = false;
            listItemCount = 0;
          }
        } else {
          if (!isParagraph) {
            isParagraph = true;
            html += '<p>';
          }
          html += line.trim() + ' ';
        }
      }

      if (isParagraph) {
        html += '</p>';
      }
      if (isList && listItemCount > 0) {
        html += '</ul>';
      }

      return html;
    }