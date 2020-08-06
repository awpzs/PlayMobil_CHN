PennController.ResetPrefix(null); //Initiates PennController
//PennController.DebugOff()
PennController.AddHost("https://raw.githubusercontent.com/awpzs/Playmobil_CHN/master/images/")

Sequence( "information", "identification", "initRecorder", "instruction", "prac", "exp_start", "block_1", "rest", "block_2", "send", "final" )

//PennController.SetCounter( "setcounter" );

newTrial( "information" ,
    newHtml("information_CHN", "information_CHN.html")
        .print()
    ,
    newButton("我同意")
        .settings.center()
        .print()
        .wait()

)

newTrial("identification" ,
    newText("请在下方输入您的Prolific ID（请务必输入此ID，否则无法领取报酬）：")
        .settings.center()
        .print()
    ,
    newTextInput("inputID", "请输入您的Prolific ID")
        .settings.center()
        .log()
        .print()
    ,
    newButton("继续")
        .settings.center()
        .print()
        .wait()    
    ,
    newVar("ID")
        .global()
        .set( getTextInput("inputID") )
)
.log( "ID" , getVar("ID") )

InitiateRecorder("http://myserver/saveVoiceRecordings.php", "Please grant the experiment access to your microphone.").label("initRecorder")

UploadRecordings("sendAsync", "noblock")

newTrial("instruction",
        newText("<p>在该实验中，您需要观看一系列场景，场景中的玩具角色会做出各种行为。我们想要了解您会如何描述场景中的变化，从而使看不见的听众了解发生了什么。</p>")  
            .print()
        ,
        newText("<p><strong>实验步骤：</strong></p><p>首先，您会先看见一张图片和一个句子。请大声朗读这个句子，然后点击它。</p><p>接下来，你会看见另一张图片，图片中的某个玩具角色会做出某种动作。请大声说出该角色做了什么动作。</p><p>您的句子应当以“现在”开头。您的句子应当让看不见图片的人也能理解场景中的变化。</p><p>口头描述完变化后，请点击“继续”按钮。</p>")
            .print()
        ,
        newButton("开始练习")
            .settings.center()
            .print()
            .wait()
)

Template(
    GetTable("prac.csv")
        .setGroupColumn("List"), variable =>
        newTrial( "prac" ,
            newMediaRecorder("recorder", "audio")
                .record()
            ,
            newText("tar1", variable.target1)
            ,
            newText("tar2", variable.target2)
            ,
            newText("inst_read", "<p>请大声朗读下面的句子。读完后，请点击句子。</p>")
                .settings.center()
                .print()
            ,
            newImage("one", variable.FirstDisplay)
                .size(342,256)
                .settings.center()
                .print()
            ,
            newText("sentence", variable.Chinese)
                .settings.center()
                .bold()
                .print()
            ,
            newSelector()
                .add( getText("sentence") )
                .wait()
            ,
            getText("inst_read")
                .remove()
            ,
            getText("sentence")
                .remove()
            ,
            newText("inst_speak", "<p>请以“现在”开头，描述图片中角色的动作变化。例如，您可以说：</p>")
                .settings.after(newText(variable.target1))
                .settings.after(newText("&nbsp;或&nbsp;"))
                .settings.after(newText(variable.target2))
                .settings.center()
                .print()
            ,
            newImage("two", variable.SecondDisplay)
                .size(342,256)
                .settings.center()
                .print()
            ,
            newButton("继续")
                .settings.center()
                .print()
                .wait()
            ,
            getVoiceRecorder("recorder")
                .stop()
            ,
            getMediaRecorder("recorder").test.recorded()
  )
  .log( "ID"     , getVar("ID")    )
  .log( "List"  , variable.List)
  .log( "Item"   , variable.Item   )
  .log( "Amb"   , variable.Amb   )
  .log( "Vis"   , variable.Vis   )
  .log( "Condition"   , variable.Condition   )
  .log( "Sentence" , variable.Chinese)
  )

newTrial("exp_start",
        newText("<p>练习到此结束，请点击“开始实验”正式开始实验。</p>")
            .settings.center()
            .print()
        ,
        newButton("开始实验")
            .settings.center()
            .print()
            .wait()
)
  
Template(
    GetTable("block_1.csv")
        .setGroupColumn("List"), variable =>
        newTrial( "block_1" ,
            newMediaRecorder("recorder", "audio")
                .record()
            ,
            newImage("one", variable.FirstDisplay)
                .size(342,256)
                .settings.center()
                .print()
            ,
            newText("sentence", variable.Chinese)
                .settings.center()
                .bold()
                .print()
            ,
            newSelector()
                .add( getText("sentence") )
                .wait()
            ,
            getText("sentence")
                .remove()
            ,
            newImage("two", variable.SecondDisplay)
                .size(342,256)
                .settings.center()
                .print()
            ,
            newButton("继续")
                .settings.center()
                .print()
                .wait()
            ,
            getVoiceRecorder("recorder")
                .stop()
            ,
            getMediaRecorder("recorder").test.recorded()
  )
  .log( "ID"     , getVar("ID")    )
  .log( "List"  , variable.List)
  .log( "Item"   , variable.Item   )
  .log( "Amb"   , variable.Amb   )
  .log( "Vis"   , variable.Vis   )
  .log( "Condition"   , variable.Condition   )
  .log( "Sentence" , variable.Chinese)
  )  

newTrial("rest",
        newText("<p>实验已完成一半，请稍事休息。</p><p>当您准备好后，请点击“继续实验”继续进行实验。</p>")
            .settings.center()
            .print()
        ,
        newButton("继续实验")
            .settings.center()
            .print()
            .wait()
)

Template(
    GetTable("block_2.csv")
        .setGroupColumn("List"), variable =>
        newTrial( "block_2" ,
            newMediaRecorder("recorder", "audio")
                .record()
            ,
            newImage("one", variable.FirstDisplay)
                .size(342,256)
                .settings.center()
                .print()
            ,
            newText("sentence", variable.Chinese)
                .settings.center()
                .bold()
                .print()
            ,
            newSelector()
                .add( getText("sentence") )
                .wait()
            ,
            getText("sentence")
                .remove()
            ,
            newImage("two", variable.SecondDisplay)
                .size(342,256)
                .settings.center()
                .print()
            ,
            newButton("继续")
                .settings.center()
                .print()
                .wait()
            ,
            getVoiceRecorder("recorder")
                .stop()
            ,
            getMediaRecorder("recorder").test.recorded()
  )
  .log( "ID"     , getVar("ID")    )
  .log( "List"  , variable.List)
  .log( "Item"   , variable.Item   )
  .log( "Amb"   , variable.Amb   )
  .log( "Vis"   , variable.Vis   )
  .log( "Condition"   , variable.Condition   )
  .log( "Sentence" , variable.Chinese)
  )  
SendResults( "send" )

newTrial( "final" ,
    newText("<p>实验结束。非常感谢您的参与！</p>")
        .print()
    ,
    newText("<p><a href='https://www.stir.ac.uk' href='_blank'>点击此处完成实验</a></p>")
        .print()
    ,
    newButton("void")
        .wait()
)