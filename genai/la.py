import cv2
import mediapipe as mp
import numpy as np
import pyautogui
import time
import platform
from pynput.mouse import Controller

# Check OS for volume control support
if platform.system() == "Windows":
    from pycaw.pycaw import AudioUtilities, IAudioEndpointVolume
    from comtypes import CLSCTX_ALL
elif platform.system() == "Darwin":
    import os

class HandGestureMouseControl:
    def __init__(self):
        self.mp_hands = mp.solutions.hands
        self.hands = self.mp_hands.Hands(
            static_image_mode=False,
            max_num_hands=2,  # Allow multi-hand support
            min_detection_confidence=0.8,
            min_tracking_confidence=0.8
        )
        self.mp_draw = mp.solutions.drawing_utils
        
        self.cap = cv2.VideoCapture(0)
        self.cap.set(cv2.CAP_PROP_FRAME_WIDTH, 1280)
        self.cap.set(cv2.CAP_PROP_FRAME_HEIGHT, 720)
        self.cap.set(cv2.CAP_PROP_FPS, 120)
        
        self.screen_width, self.screen_height = pyautogui.size()
        pyautogui.FAILSAFE = False
        self.cursor_smooth_factor = 0.7
        self.prev_x, self.prev_y = 0, 0
        self.last_click_time = 0
        self.last_volume_time = 0
        self.mouse = Controller()
        
        if platform.system() == "Windows":
            devices = AudioUtilities.GetSpeakers()
            interface = devices.Activate(
                IAudioEndpointVolume._iid_, CLSCTX_ALL, None)
            self.volume = interface.QueryInterface(IAudioEndpointVolume)
    
    def adjust_volume(self, increase=True):
        if platform.system() == "Windows":
            current_volume = self.volume.GetMasterVolumeLevelScalar()
            new_volume = min(1.0, current_volume + 0.1) if increase else max(0.0, current_volume - 0.1)
            self.volume.SetMasterVolumeLevelScalar(new_volume, None)
        elif platform.system() == "Darwin":
            os.system("osascript -e 'set volume output volume {}'".format(100 if increase else 0))
    
    def process_landmarks(self, hand_landmarks):
        try:
            index_tip = hand_landmarks.landmark[self.mp_hands.HandLandmark.INDEX_FINGER_TIP]
            thumb_tip = hand_landmarks.landmark[self.mp_hands.HandLandmark.THUMB_TIP]
            middle_tip = hand_landmarks.landmark[self.mp_hands.HandLandmark.MIDDLE_FINGER_TIP]
            wrist = hand_landmarks.landmark[self.mp_hands.HandLandmark.WRIST]

            x = np.interp(index_tip.x, [0.2, 0.8], [0, self.screen_width])
            y = np.interp(index_tip.y, [0.2, 0.8], [0, self.screen_height])
            
            smoothed_x = self.prev_x + (x - self.prev_x) * self.cursor_smooth_factor
            smoothed_y = self.prev_y + (y - self.prev_y) * self.cursor_smooth_factor
            
            self.mouse.position = (smoothed_x, smoothed_y)
            self.prev_x, self.prev_y = smoothed_x, smoothed_y
            
            current_time = time.time()
            thumb_index_distance = np.linalg.norm([thumb_tip.x - index_tip.x, thumb_tip.y - index_tip.y])
            thumb_middle_distance = np.linalg.norm([thumb_tip.x - middle_tip.x, thumb_tip.y - middle_tip.y])
            index_middle_distance = np.linalg.norm([index_tip.x - middle_tip.x, index_tip.y - middle_tip.y])

            if thumb_index_distance < 0.05 and (current_time - self.last_click_time) > 0.2:
                pyautogui.click()
                self.last_click_time = current_time
            elif thumb_middle_distance < 0.05 and (current_time - self.last_click_time) > 0.2:
                pyautogui.rightClick()
                self.last_click_time = current_time
            elif index_middle_distance < 0.05 and (current_time - self.last_click_time) > 0.2:
                pyautogui.doubleClick()
                self.last_click_time = current_time
            elif thumb_index_distance > 0.1 and thumb_middle_distance > 0.1:
                pyautogui.scroll(100)
            elif thumb_index_distance < 0.04 and thumb_middle_distance < 0.04:
                pyautogui.scroll(-100)
            elif wrist.y - index_tip.y > 0.08 and (current_time - self.last_volume_time) > 0.5:
                self.adjust_volume(increase=True)
                self.last_volume_time = current_time
            elif wrist.y - index_tip.y < -0.08 and (current_time - self.last_volume_time) > 0.5:
                self.adjust_volume(increase=False)
                self.last_volume_time = current_time
        except Exception as e:
            print(f"Error processing landmarks: {e}")
    
    def process_frame(self, frame):
        frame = cv2.flip(frame, 1)
        rgb_frame = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
        results = self.hands.process(rgb_frame)

        if results.multi_hand_landmarks:
            for hand_landmarks in results.multi_hand_landmarks:
                self.mp_draw.draw_landmarks(
                    frame, hand_landmarks, self.mp_hands.HAND_CONNECTIONS,
                    self.mp_draw.DrawingSpec(color=(0,255,0), thickness=2, circle_radius=2)
                )
                self.process_landmarks(hand_landmarks)
        
        cv2.putText(frame, "Hand Gesture Mouse Control", (10, 30), cv2.FONT_HERSHEY_SIMPLEX, 0.7, (0, 255, 0), 2)
        return frame


def main():
    controller = HandGestureMouseControl()
    while True:
        success, frame = controller.cap.read()
        if not success:
            continue
        frame = controller.process_frame(frame)
        cv2.imshow('Hand Gesture Mouse Control', frame)
        if cv2.waitKey(1) & 0xFF == ord('q'):
            break
    controller.cap.release()
    cv2.destroyAllWindows()

if __name__ == "__main__":
    main()
