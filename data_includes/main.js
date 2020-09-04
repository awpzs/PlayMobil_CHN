PennController.ResetPrefix(null); //Initiates PennController
PennController.DebugOff()
PennController.AddHost("https://raw.githubusercontent.com/awpzs/Playmobil_CHN/master/images/")

Sequence( "information", "identification", "recording_information", "initRecorder", "instruction", "prac", "exp_start", "block_1", "rest", "block_2", "send", "final" )

PennController.SetCounter( "setcounter" );

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
    newTextInput("inputID", GetURLParameter('id'))
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

newTrial("recording_information" ,
    newText("<p>请注意，该实验需要录音。请您尽量在安静的环境里完成实验，并在需要录音时保持声音洪亮清晰。</p><p>在实验过程中，请尽量保持专注，并一次性完成实验。</p><p>实验进行到一半时会有提示，届时您可以进行1-2分钟的短暂休息。</p><p>实验过程中请不要关闭或是刷新该网页，否则您将无法回到并完成该实验。</p>")
        .settings.center()
        .print()
    ,
    newButton("继续")
        .settings.center()
        .print()
        .wait()    
)

InitiateRecorder("https://langprolab.stir.ac.uk/pcibex/index.php", "请允许expt.pcibex.net使用您的麦克风，然后点击下方英文链接继续。").label("initRecorder")

UploadRecordings("sendAsync", "noblock")

newTrial("instruction",
        newText("<p>非常感谢您能参加该实验！在该实验中，您需要观看一系列场景，场景中的玩具角色会做出各种动作。</p><p>我们想要了解您会如何描述场景中的变化，从而使看不见这些场景的听众了解发生了什么。</p>")  
            .print()
        ,
        newText("<p><strong>实验步骤：</strong></p><p>首先，您会先看见一张图片和一个句子。请假设您有一位看不见图片的听众。请大声朗读这个句子，然后点击它。</p><p>接下来，你会看见另一张图片，图片中的某个玩具角色会做出某个动作。请用一个<strong><u>新的句子</u></strong>，描述该角色做了什么动作。请大声说出这个句子。</p><p>您的句子应当以“现在”开头。您的句子应当让看不见图片的听众也能够用同样的玩具，让那个角色做出同样的动作。</p><p></p>")
            .print()
        ,
        newText("<p>口头描述完变化后，请点击“继续”按钮。请点击下方按钮，观看示例，开始练习。</p>")
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
            newText("inst_read", "<p>请大声朗读下面的句子。读完后，请点击句子，观看第二张图片。</p>")
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
            newText("请以“现在”开头，描述图片中角色的动作变化。例如，您可以说：")
                .settings.center()
                .print()
            ,
            newText(variable.target1)
                .settings.after(newText("&nbsp;或&nbsp;"))
                .settings.after(newText(variable.target2))
                .settings.after(newText("&nbsp;或&nbsp;"))
                .settings.after(newText(variable.target3))
                .settings.center()
                .print()
            ,
            newText("在实验过程中，您可以自由选择您认为合适的表达方式。")
                .settings.center()
                .print()
            ,
            newImage("two", variable.SecondDisplay)
                .size(342,256)
                .settings.center()
                .print()
            ,
            newText(variable.cont)
                .settings.center()
                .print()
            ,
            newButton("继续")
                .settings.center()
                .print()
                .wait()
            ,
            getMediaRecorder("recorder")
                .stop()
            ,
            getMediaRecorder("recorder").test.recorded()
                .failure(newText("抱歉，您的麦克风似乎出了什么问题，实验无法继续。请退出实验，并联系研究者。").settings.center().print())
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
        newText("<p>练习到此结束，请点击“开始实验”正式开始实验。</p><p>正式实验中将不会出现任何说明和例句。</p>")
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
            getMediaRecorder("recorder")
                .stop()
            ,
            getMediaRecorder("recorder").test.recorded()
                .failure(newText("抱歉，您的麦克风似乎出了什么问题，实验无法继续。请退出实验，并联系研究者。").settings.center().print())

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
        newText("<p>实验已完成一半，请稍事休息。请不要关闭或刷新该网页。</p><p>当您准备好后，请点击“继续实验”继续进行实验。</p>")
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
            getMediaRecorder("recorder")
                .stop()
            ,
            getMediaRecorder("recorder").test.recorded()
                .failure(newText("抱歉，您的麦克风似乎出了什么问题，实验无法继续。请退出实验，并联系研究者。").settings.center().print())
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
    newFunction("redirect", function(){ window.location = "https://app.prolific.co/submissions/complete?cc=36EDE175"; })
    ,
    newText("<p>实验结束。非常感谢您的参与！</p><p>5秒后自动<a href='https://app.prolific.co/submissions/complete?cc=36EDE175'>返回Prolific……</a></p>")
        .settings.center()
        .print()
    ,
    newTimer("wait", 5000)
        .start()
        .wait()
    ,
    getFunction("redirect")
        .call()
)
