
#define trigger 8
#define echo 10
#define LED 7
#define LED2 11
#define HIGHPORT 4


float time = 0, distance = 0;

void setup() {
  // put your setup code here, to run once:
  Serial.begin(9600);
  pinMode(LED, OUTPUT);
  pinMode(trigger,OUTPUT);
  pinMode(echo,INPUT);
  pinMode(LED2,OUTPUT);
  pinMode(HIGHPORT, OUTPUT);

}

void loop() {
  // put your main code here, to run repeatedly:
  digitalWrite(HIGHPORT, HIGH);
  digitalWrite(trigger,LOW);
  delayMicroseconds(2);
  digitalWrite(trigger,HIGH);
  
  delayMicroseconds(10);
  digitalWrite(trigger,LOW);
  
  delayMicroseconds(2);
  time=pulseIn(echo,HIGH);
  
  distance=time*340/20000;
  Serial.print(distance);
  Serial.print("\n");
  if(distance > 6.0){
    digitalWrite(LED, HIGH);
    digitalWrite(LED2, LOW);
  }else{
    digitalWrite(LED, LOW);
    digitalWrite(LED2, HIGH);
  }
    
}
