import * as THREE from "three";
import ASScroll from "@ashthornton/asscroll";
import GSAP from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Experience from "../Experience";

export default class Controls {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.sizes = this.experience.sizes;
    this.resources = this.experience.resources;
    this.camera = this.experience.camera;
    this.room = this.experience.world.room.roomModel;

    this.circle = this.experience.world.floor.circle;
    this.circle2 = this.experience.world.floor.circle2;
    this.circle3 = this.experience.world.floor.circle3;
    this.circle4 = this.experience.world.floor.circle4;

    this.sunLight = this.experience.world.environment.sunlight;

    GSAP.registerPlugin(ScrollTrigger);

    // document.querySelector(".page").style.overflowY = "visible";

    this.setSmothScroll();
    this.setScrollTrigger();
  }

  setupASScroll() {
    // https://github.com/ashthornton/asscroll
    const asscroll = new ASScroll({
      ease: 0.3,
      disableRaf: true,
    });

    GSAP.ticker.add(asscroll.update);

    ScrollTrigger.defaults({
      scroller: asscroll.containerElement,
    });

    ScrollTrigger.scrollerProxy(asscroll.containerElement, {
      scrollTop(value) {
        if (arguments.length) {
          asscroll.currentPos = value;
          return;
        }
        return asscroll.currentPos;
      },
      getBoundingClientRect() {
        return {
          top: 0,
          left: 0,
          width: window.innerWidth,
          height: window.innerHeight,
        };
      },
      fixedMarkers: true,
    });

    asscroll.on("update", ScrollTrigger.update);
    ScrollTrigger.addEventListener("refresh", asscroll.resize);

    requestAnimationFrame(() => {
      asscroll.enable({
        newScrollElements: document.querySelectorAll(
          ".gsap-marker-start, .gsap-marker-end, [asscroll]"
        ),
      });
    });
    return asscroll;
  }

  setSmothScroll() {
    this.asscroll = this.setupASScroll();
  }

  setScrollTrigger() {
    let mm = GSAP.matchMedia();

    mm.add(
      {
        isDesktop: `(min-width: 969px)`,
        isMobile: `(max-width: 968px)`,
      },
      (context) => {
        let { isDesktop, isMobile } = context.conditions;

        if (isDesktop) {
          // Reset
          this.room.scale.set(0.5, 0.5, 0.5);

          // First section
          this.firstTimeline = new GSAP.timeline({
            scrollTrigger: {
              trigger: ".first",
              start: "top top",
              end: "bottom+=800 bottom",
              scrub: 1.2,
              invalidateOnRefresh: true,
            },
          }).to(this.room.position, {
            x: () => {
              return this.sizes.width * 0.0011;
            },
            ease: "power1.inOut",
          })

          // Second section
          this.secondTimeline = new GSAP.timeline({
            scrollTrigger: {
              trigger: ".second",
              start: "top top",
              end: "bottom+=800 bottom",
              scrub: 1.2,
              invalidateOnRefresh: true,
            },
            ease: "power1.inOut",
          })
            .to(
              this.room.position,
              {
                x: () => {
                  return -this.sizes.width * 0.0008;
                },
                z: () => {
                  return this.sizes.height * 0.0018;
                },
                y: 0.5,
                // ease: "power1.inOut",
              },
              "same"
            )
            .to(
              this.room.scale,
              {
                x: 1.3,
                y: 1.3,
                z: 1.3,
              },
              "same"
            )
            .to(
              this.circle2.position,
              {
                x: 0.5,
              },
              "same"
            )

          // Third section
          this.thirdTimeline = new GSAP.timeline({
            scrollTrigger: {
              trigger: ".third",
              start: "top top",
              end: "bottom+=800 bottom",
              scrub: 1.2,
              invalidateOnRefresh: true,
            },
             ease: "power1.inOut",
          })
            .to(
              this.room.scale,
              {
                x: 1,
                y: 1,
                z: 1,
              },
              "sideLeft"
            )
            .to(
              this.circle.position,
              {
                x: -5,
              },
              "sideLeft"
            )
            .to(
              this.circle2.position,
              {
                x: -5,
              },
              "sideLeft"
            )
            .to(
              this.camera.orthographicCamera.position,
              {
                x: -5,
                y: 0.9,
              },
              "sideLeft"
            )
            .to(
              this.sunLight.position,
              {
                x: -5,
                // y: 0.9,
                z: 9,
              },
              "sideLeft"
            )
            .to(
              this.circle3.position,
              {
                x: -4,
                z: 4.5,
              },
              "sideLeft"
            )

            // Fourth section
            this.fourthTimeline = new GSAP.timeline({
              scrollTrigger: {
                trigger: ".fourth",
                start: "top top",
                end: "bottom+=800 bottom",
                scrub: 1.2,
                invalidateOnRefresh: true,
              },
               ease: "power1.inOut",
            })
            .to(
              this.circle3.position,
              {
                x: 3,
                z: 1.5,
                // y: 0.4,
              },
              "same"
            )
            .to(
              this.room.position,
              {
                x: () => {
                  return -this.sizes.width * 0.00092;
                },
                z: () => {
                  return this.sizes.height * 0.0018;
                },
                y: 0.5,
                // ease: "power1.inOut",
              },
              "same"
            )
            .to(
              this.room.scale,
              {
                x: 0.5,
                y: 0.5,
                z: 0.5,
              },
              "same"
            )
            .to(
              this.camera.orthographicCamera.position,
              {
                x: 0.2,
                y: 2.6,
              },
              "same"
            )
            .to(
              this.circle4.position,
              {
                x: 0.5,
                z: 1,
                y: 0.15,
              },
              "same"
            )
            .to(
              this.sunLight.position,
              {
                x: -1,
                y: 7,
                z: 2.5,
              },
              "same"
            )

        } else if (isMobile) {
          // Reset
          this.room.scale.set(0.3, 0.3, 0.3);

          // First section
          this.firstMobileTimeline = new GSAP.timeline({
            scrollTrigger: {
              trigger: ".first",
              start: "top top",
              end: "bottom+=800 bottom",
              scrub: 1.2,
              invalidateOnRefresh: true,
            },
          }).to(this.room.scale, {
            x: 0.4,
            y: 0.4,
            z: 0.4,
          });

          // Second section
          this.secondMobileTimeline = new GSAP.timeline({
            scrollTrigger: {
              trigger: ".second",
              start: "top top",
              end: "bottom+=800 bottom",
              scrub: 1.2,
              invalidateOnRefresh: true,
            },
          }).to(this.room.scale, {
            x: 1.2,
            y: 1.2,
            z: 1.2,
          },)

          // Third section
          this.thirdMobileTimeline = new GSAP.timeline({
            scrollTrigger: {
              trigger: ".third",
              start: "top top",
              end: "bottom+=800 bottom",
              scrub: 1.2,
              invalidateOnRefresh: true,
            },
          }).to(this.camera.orthographicCamera.position, {
            x: -1.5,
            y: 1,
          }).to(
            this.circle4.position,
            {
              x: 0.5,
              z: 1,
              y: 0.15,
            },
            "same"
          )

          // Fourth section
          this.fourthMobileTimeline = new GSAP.timeline({
            scrollTrigger: {
              trigger: ".fourth",
              start: "top top",
              end: "bottom+=800 bottom",
              scrub: 1.2,
              invalidateOnRefresh: true,
            },
          }).to(this.camera.orthographicCamera.position, {
            x: 1,
            // y: 2,
            z: 5,
          });
        }

        // Progress bar
        this.sections = document.querySelectorAll(".section");
        this.sections.forEach((section) => {
          this.progressWrapper = section.querySelector(".progress-wrapper");
          this.progressBar = section.querySelector(".progress-bar");

          if (section.classList.contains("right")) {
            GSAP.to(section, {
              borderTopLeftRadius: 10,
              scrollTrigger: {
                trigger: section,
                start: "top bottom",
                end: "top top",
                scrub: 0.6,
              },
            });

            GSAP.to(section, {
              borderBottomLeftRadius: 700,
              scrollTrigger: {
                trigger: section,
                start: "bottom bottom",
                end: "bottom top",
                scrub: 0.6,
              },
            });
          } else {
            GSAP.to(section, {
              borderTopRightRadius: 10,
              scrollTrigger: {
                trigger: section,
                start: "top bottom",
                end: "top top",
                scrub: 0.6,
              },
            });

            GSAP.to(section, {
              borderBottomRightRadius: 700,
              scrollTrigger: {
                trigger: section,
                start: "bottom bottom",
                end: "bottom top",
                scrub: 0.6,
              },
            });
          }

          if (isDesktop) {
            GSAP.from(this.progressBar, {
              scaleY: 0,
              scrollTrigger: {
                trigger: section,
                start: "top top",
                end: "bottom bottom",
                scrub: 0.4,
                pin: this.progressWrapper,
                pinSpacing: false,
              },
            });
          }

        });

        // Cricle animation
        this.circleTimeline = new GSAP.timeline({
          scrollTrigger: {
            trigger: ".first",
            start: "top top",
            end: "bottom+=800 bottom",
            scrub: 1.2,
            invalidateOnRefresh: true,
          },
        }).to(this.circle.scale, {
          x: 1.6,
          y: 1.6,
          z: 1.6,
          ease: "power1.out",
        });

        this.circleTimeline2 = new GSAP.timeline({
          scrollTrigger: {
            trigger: ".second",
            start: "top top",
            end: "bottom+=800 bottom",
            scrub: 1.2,
            invalidateOnRefresh: true,
          },
        }).to(this.circle2.scale, {
          x: 1.9,
          y: 1.9,
          z: 1.9,
          ease: "power1.out",
        });

        this.circleTimeline3 = new GSAP.timeline({
          scrollTrigger: {
            trigger: ".third",
            start: "top top",
            end: "bottom+=800 bottom",
            scrub: 1.2,
            invalidateOnRefresh: true,
          },
        }).to(this.circle3.scale, {
          x: 1.9,
          y: 1.9,
          z: 1.9,
          ease: "power1.out",
        });

        this.circleTimeline4 = new GSAP.timeline({
          scrollTrigger: {
            trigger: ".fourth",
            start: "top top",
            end: "bottom+=800 bottom",
            scrub: 1.2,
            invalidateOnRefresh: true,
          },
        }).to(this.circle4.scale, {
          x: 1.9,
          y: 1.9,
          z: 1.9,
          ease: "power1.out",
        });

        // Mini Platform animation
        this.miniPlatformTimeline = new GSAP.timeline({
          scrollTrigger: {
            trigger: ".third",
            start: "center center",
          },
        });

        this.room.children.forEach((child) => {
          if (child.name === "MiniFloor") {
            this.first = GSAP.to(child.position, {
              x: -1.17847,
              z: 2.84269,
              duration: 0.3,
            });
          }

          if (child.name === "Mailbox") {
            this.second = GSAP.to(child.scale, {
              x: 1,
              y: 1,
              z: 1,
              duration: 0.3,
              ease: "back.out(2)",
            });
          }
          if (child.name === "ExteriorLamp") {
            this.third = GSAP.to(child.scale, {
              x: 1,
              y: 1,
              z: 1,
              duration: 0.3,
              ease: "back.out(2)",
            });
          }
          if (child.name === "Floor1") {
            this.fourth = GSAP.to(child.scale, {
              x: 1,
              y: 1,
              z: 1,
              duration: 0.3,
              ease: "back.out(2)",
            });
          }
          if (child.name === "Floor2") {
            this.fifth = GSAP.to(child.scale, {
              x: 1,
              y: 1,
              z: 1,
              duration: 0.3,
              ease: "back.out(2)",
            });
          }
          if (child.name === "Floor3") {
            this.sixth = GSAP.to(child.scale, {
              x: 1,
              y: 1,
              z: 1,
              duration: 0.3,
              ease: "back.out(2)",
            });
          }
          if (child.name === "FloorStep1") {
            this.seventh = GSAP.to(child.scale, {
              x: 1,
              y: 1,
              z: 1,
              duration: 0.3,
              ease: "back.out(2)",
            });
          }
          if (child.name === "FloorStep2") {
            this.heighth = GSAP.to(child.scale, {
              x: 1,
              y: 1,
              z: 1,
              duration: 0.3,
              ease: "back.out(2)",
            });
          }
        });

        this.miniPlatformTimeline.add(this.first);
        this.miniPlatformTimeline.add(this.second);
        this.miniPlatformTimeline.add(this.third);
        this.miniPlatformTimeline.add(this.fourth, "-=0.2");
        this.miniPlatformTimeline.add(this.fifth, "-=0.2");
        this.miniPlatformTimeline.add(this.sixth, "-=0.2");
        this.miniPlatformTimeline.add(this.seventh, "-=0.1");
        this.miniPlatformTimeline.add(this.heighth, "-=0.1");
      }
    );
  }

  resize() {}

  update() {}
}
