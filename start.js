var fs = require('fs');



function makeDir(name)
	{
		//fs.existsSync(name)
		try
			{
				fs.mkdirSync(name);
				let msg = `Folder created : ${name}`
				console.log(msg);
				return true;
			}
		catch(e)
			{
				if (e.code == 'EEXIST')
					{
						let msg = `Folder exists : ${name}`;
						console.log(msg);
					}
				else
					console.log(e);


				return false;
			}
	}


function makeFile( data )
	{
		let name = data[0];
		let content = data[1]? data[1] : '';

		if( fs.existsSync(name) )
			{
				if( !content )
					{
						console.log(`File exists : ${name}`);
						return false;
					}
				else
					{
						fs.writeFileSync( name , content );
						console.log(`File content updated < == > ${name}`);
						return true;
					}

			}
		else
			{

				fs.writeFileSync( name , content )
				console.log(`File created ==>> ${name}`);
				return true;
			}
	}

//--Folders
	const dist    = 'include';

	const dev     = 'src/_dev_js_sass';
	const scss    = dev + '/sass';
	const img     = 'src/files/img';
	const js      = dev + '/js';

	const config  = 'config';

	const folders = [ dist, src, scss, img, js, config ];



//--Files
 	const main_scss  = scss + '/main.scss';
 	const index_js   = js   + '/index.js';
 	const postcss    = config + '/postcss.config.js';

 	var postcss_content  = "module.exports = {plugins: [require('autoprefixer')]}";
 	var index_js_imports = "import '../scss/main.scss';";

 	const files      = [  [ main_scss ], [ index_js, index_js_imports ], [ postcss, postcss_content ]  ];




folders.map( f => makeDir( f ) );
files.map(  f => makeFile( f ) );
