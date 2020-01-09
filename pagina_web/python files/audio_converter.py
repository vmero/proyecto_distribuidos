from pydub import AudioSegment

def normalize_sound(file, sound, target_dBFS):
	sound = AudioSegment.from_file(file, file.split(".")[1])
    change_in_dBFS = -20.0 - sound.dBFS
    sound = sound.apply_gain(change_in_dBFS)
	sound.export(file, format="mp4")