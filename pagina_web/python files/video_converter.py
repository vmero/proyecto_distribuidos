import ffmpeg
from converter import Converter
from moviepy.editor import VideoFileClip

def flip_video(file, orientation):
	stream = ffmpeg.input(file)
	if (orientation == "horizontal):
		stream = ffmpeg.hflip(stream)
	else:
		stream = ffmpeg.vflip(stream)
	stream = ffmpeg.output(stream, file)
	
def convert_file(file, format):
	conv = Converter()
	info = conv.probe(file)

	convert = conv.convert(file, file.split('.')[0] + '.' + format, {
		'format': format,
		'audio': {
			'codec': 'aac',
			'samplerate': 11025,
			'channels': 2
		},
		'video': {
			'codec': 'hevc',
			'width': 720,
			'height': 400,
			'fps': 25
		}})

def crear_thumbnail(file, time):
	conv = Converter()
	return conv.thumbnail(file, time, 'thumbnail.jpg', '320x240')
	
def remover_audio(file):
	video = VideoFileClip(file).without_audio()
	video.write_videofile(file)