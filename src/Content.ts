import fs from "fs";
import http from "http";
import url from "url";

export default class Content {
    public content(req: http.IncomingMessage, res: http.ServerResponse): void {
        // favicon.ico kérés kiszolgálása:
        if (req.url === "/favicon.ico") {
            res.writeHead(200, { "Content-Type": "image/x-icon" });
            fs.createReadStream("favicon.ico").pipe(res);
            return;
        }
        // Weboldal inicializálása + head rész:
        res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
        res.write("<!DOCTYPE html>");
        res.write("<html lang='hu'>");
        res.write("<head>");
        res.write("<style>input, pre {font-family:monospace; font-size:1em; font-weight:bold;}</style>");
        res.write("<meta name='viewport' content='width=device-width, initial-scale=1.0'>");

        // Material Design Bootstrap súgó: https://mdbootstrap.com/
        // Font Awesome:
        res.write("<link rel='stylesheet' href='https://use.fontawesome.com/releases/v5.8.2/css/all.css'>");
        // Google Fonts:
        res.write("<link rel='stylesheet' href='https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap'>");
        // Bootstrap core CSS:
        res.write("<link rel='stylesheet' href='https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.4.1/css/bootstrap.min.css'>");
        // Material Design Bootstrap:
        res.write("<link rel='stylesheet' href='https://cdnjs.cloudflare.com/ajax/libs/mdbootstrap/4.15.0/css/mdb.min.css'>");

        res.write("<title>Jedlik Ts Template</title>");
        res.write("</head>");
        res.write("<body><form><pre class='m-3'>");
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const params = url.parse(req.url as string, true).query;

        // Kezd a kódolást innen -->
        res.write("\nLegnagyobb közös osztó (LNKO) meghatározása:\n");
        res.write("k= ");
        let k: number = parseInt(params.k as string);
        if (isNaN(k)) {
            k = 20;
        }
        res.write(`<input type='text' name='k' value=${k} style='width:5em;' onChange='this.form.submit();'>\n`);
        res.write("l= ");
        let l: number = parseInt(params.l as string);
        if (isNaN(l)) {
            l = 60;
        }
        res.write(`<input type='text' name='l' value=${l} style='width:5em;' onChange='this.form.submit();'>\n`);
        while (k != l) {
            if (k > l) k = k - l;
            else l = l - k;
        }
        res.write(`A két szám LNKO-ja: ${k}`);
        res.write("\nLegnagyobb közös osztó (LNKO) meghatározása Euklidesz-i módszerrel:\n");
        res.write("g= ");
        let g: number = parseInt(params.g as string);
        if (isNaN(g)) {
            g = 60;
        }
        res.write(`<input type='text' name='g' value=${g} style='width:5em;' onChange='this.form.submit();'>\n`);
        res.write("h= ");
        let h: number = parseInt(params.h as string);
        if (isNaN(h)) {
            h = 20;
        }
        res.write(`<input type='text' name='h' value=${h} style='width:5em;' onChange='this.form.submit();'>\n`);
        let m: number = parseInt(params.m as string);
        do {
            m = g % h; //maradékos osztás
            g = h; //előző maradék
            h = m; //új maradék
        } while (m != 0);
        res.write(`A két szám LNKO-ja Euklidesz-i módszerrel: ${g}`);
        // <---- Fejezd be a kódolást

        res.write("</pre></form>");
        res.write("</body></html>");
        res.end();
    }
}
