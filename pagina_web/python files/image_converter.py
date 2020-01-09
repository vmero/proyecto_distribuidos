from PIL import Image

def convert_to(infile, format) {
	outfile = infile.split(".")[0] + "." + format
	Image.open(infile).save(outfile)
}

def black_white(infile) {
	image_file = Image.open(infile)
	image_file = image_file.convert('1')
	image_file.save(infile)
}

def crop_image(infile, box) {
	region = Image.open(infile).crop(box)
	region.save(infile)
}