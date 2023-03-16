AFRAME.registerComponent("bowling",{
    init:function(){
        this.throw()
    },
    throw:function(){
        window.addEventListener("keydown",(e)=>{
            if (e.key==="z"){
                var ball=document.createElement("a-entity")
                ball.setAttribute("geometry",{primitive:"sphere",radius:0.8})
                ball.setAttribute("material","color","black")
                var camera=document.querySelector("#camera")
                pos=camera.getAttribute("position")
                ball.setAttribute("position",{x:pos.x,y:pos.y-0.8,z:pos.z})
                var camera=document.querySelector("#camera").object3D
                var direction=new THREE.Vector3()
                camera.getWorldDirection(direction)
                ball.setAttribute("velocity",direction.multiplyScalar(-10))
                var scene=document.querySelector("#scene")
                ball.setAttribute("dynamic-body",{
                    shape:"sphere",
                    mass:1000
                  })
                ball.addEventListener("collide",this.removeball)
                scene.appendChild(ball)
            }
        })
    },
    removeBall: function (e) {
        console.log(e.detail.target.el);
        console.log(e.detail.body.el);
        var element=e.detail.target.el
        var elementHit=e.detail.body.el
        if (elementHit.id.includes("pin")) 
          {
            var impulse=new CANNON.Vec3(0,1,-15)
            var worldPoint=new CANNON.Vec3().copy(elementHit.getAttribute("position"))
            elementHit.body.applyImpulse(impulse,worldPoint)
            element.removeEventListner("collide",this.throw)
            var scene=document.querySelector("#scene")
            scene.removeChild(element)
          
        }
      },
    });
    