const puppeteer 	= require('puppeteer');
      cp        	= require('child_process');
	  fs 			= require('fs'),
	  del 			= require('del'),
	  gulp 			= require('gulp'),
	  plumber   	= require('gulp-plumber'),
	  browserSync 	= require('browser-sync');

const viewportSize = {
    width: 1600,
    height: 1000
};

const clipping = {
    x: 0,
    y: 0,
    width: 1600,
    height: 1000
}


async function timeout(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

module.exports = (gulp, config) => {

	const isDist = config.flags.isDist;
    const rebuild = config.flags.rebuildShowcase;
	const docs =  isDist || rebuild ? true : config.flags.docs;

	const screenshotDir = config.src.showcase_screenshots_dir;
	const websiteList = config.data.showcase;

	return async () => {
		if (rebuild) {
			await del(screenshotDir);
		}

		if (docs) {
		    const browser = await puppeteer.launch( { headless: true } );
		    const page = await browser.newPage();
		    await page.setViewport(viewportSize);

		    if (!fs.existsSync(screenshotDir)){
		        fs.mkdirSync(screenshotDir);
		    }

		    for (let i = 0; i < websiteList.length; i++) {
		        const url = websiteList[i].screenshotUrl;
		        const imageName = screenshotDir + websiteList[i].screenshotName + '.png';

		        if (fs.existsSync(imageName)) {
		            console.log('Skipped ' + imageName);
		        } else {
		            await page.goto(`${url}`, { waitUntil: 'networkidle2' });

		            if (websiteList[i].delayAmount) {
		                await page.evaluate(() => { window.scrollBy(0, window.innerHeight); })
		                await timeout(websiteList[i].delayAmount);
		            }

		            await page.screenshot({path: imageName, clip: clipping});
		        }
		    }

		    await browser.close();

		    await cp.spawn('./gulp_tasks/resize_showcase.sh');

		    console.log("Finished generating screenshots.");

		    await gulp.src(config.src.showcase_screenshots)
				.pipe(plumber({
					errorHandler: err => {
						console.error(err);
					}
				}))
				.pipe(gulp.dest(config.dist.showcase_screenshots))
				.pipe(browserSync.reload({stream: true}));
		}
	};

	return () => {

	}
};
