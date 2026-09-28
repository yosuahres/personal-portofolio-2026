import type { Metadata } from "next";

import { createMetadata } from "@/lib/metadata";

import { Heading, MediaPlaceholder, Paragraph, Subheading, WorkArticle } from "../ArticleParts";

export const metadata: Metadata = createMetadata({
  title: "BRIN",
  description:
    "Exploring foundation models for robot affordance and rotation trajectory prediction as an AI Researcher Assistant Intern at BRIN.",
  path: "/about/brin",
});

export default function BrinPage() {
  return (
    <WorkArticle slug="brin" title="BRIN">
      <Paragraph>
        From July to October 2025 I interned as an AI Researcher Assistant at the Research Center
        for Smart Instrumentation Systems, part of Indonesia&apos;s National Research and Innovation
        Agency (BRIN) in Bandung. My project was developing computer vision models that help a robot
        arm generalize across objects and predict how to rotate when picking them up.
      </Paragraph>
      <Paragraph>
        The core question was which combination of foundation models best turns what a robot sees
        into precise action. That breaks down into two problems: finding the part of an object the
        robot should touch, and planning a 6-DoF path, position and rotation, to reach it.
      </Paragraph>

      <Heading>Affordance</Heading>
      <Paragraph>
        An affordance is the part of an object that invites interaction: a mug&apos;s handle, a
        drawer pull, a microwave button. The goal was to find these points on everyday objects
        without hand-labelled training data.
      </Paragraph>

      <Subheading>UAD and DINOv2</Subheading>
      <Paragraph>
        I used DINOv2 (ViT-g/14), a self-supervised vision model, as the feature extractor. On top
        of it I implemented Unsupervised Affordance Distillation (UAD), which distills DINOv2&apos;s
        feature maps into an affordance heatmap. Given an image of a cup or a hammer, the heatmap
        lights up the regions most likely to be grabbed, and the affordance point is the pixel with
        the highest intensity.
      </Paragraph>
      <MediaPlaceholder label="Object generalization and affordance architecture" />

      <Subheading>Pointing with Gemini Robotics and RoboBrain</Subheading>
      <Paragraph>
        Alongside UAD, I compared how Gemini Robotics and RoboBrain locate interaction points.
        RoboBrain links what it sees to robotics knowledge to infer which part of an object matters,
        while Gemini Robotics maps affordances from an object&apos;s shape and spatial structure.
        Each produced interaction points that were easy to interpret, though they differed in how
        well they generalized to new objects.
      </Paragraph>

      <Heading>From Perception to Action</Heading>

      <Subheading>Robotic Transformers</Subheading>
      <Paragraph>
        For turning perception into motion I implemented three Robotic Transformer variants. RT-1
        takes the last six camera frames and a language instruction and outputs discretized action
        tokens. It served as the end-to-end baseline and was the fastest, but it struggled with
        movements it hadn&apos;t seen in training.
      </Paragraph>
      <Paragraph>
        RT-Trajectory conditions the policy on a rough 2D or 2.5D sketch of the desired path, drawn
        over the image with color encoding time and height. That explicit guidance gave it the best
        generalization to new tasks. RT-Affordance splits the job in two: a vision-language model
        plans key poses such as pre-grasp, grasp and release, and a policy executes against that
        plan, balancing semantic reasoning with precise control.
      </Paragraph>
      <MediaPlaceholder label="Trajectory prediction architecture" />

      <Subheading>Multimodal language models as planners</Subheading>
      <Paragraph>
        I also tested RoboBrain 1.0, RoboBrain 2.0 and Gemini Robotics as high-level planners,
        prompting them with instructions like &ldquo;Generate a trajectory to pick up the mug by its
        handle.&rdquo; All three could identify an affordance and produce a matching trajectory in
        one pass, and RoboBrain 2.0 could explain how the object&apos;s geometry, the contact point
        and the planned motion related to each other.
      </Paragraph>

      <Heading>Learning Rotation from Human Hands</Heading>
      <Paragraph>
        Opening a door means turning a lever handle, which needs a very specific rotation. Without
        the resources to record robot demonstrations, we collected data from people instead.
      </Paragraph>

      <Subheading>Capturing hand motion</Subheading>
      <Paragraph>
        Using a single RGB camera and MediaPipe Hands, I tracked the 21 landmarks of an
        operator&apos;s hand while they opened and closed a door from different starting angles.
        From the wrist and knuckle landmarks I built a rotation matrix for the palm and extracted
        roll, pitch and yaw for every frame. That orientation became a stand-in for the robot
        gripper&apos;s orientation, and each clip was labelled with an instruction such as
        &ldquo;open the door clockwise.&rdquo;
      </Paragraph>
      <MediaPlaceholder label="MediaPipe hand tracking" />

      <Subheading>Fine-tuning RoboBrain with LoRA</Subheading>
      <Paragraph>
        I chose RoboBrain 1.0 as the base model because it was openly available and light enough to
        modify. I applied LoRA to the attention layers of its encoder and decoder so it could adapt
        to rotation prediction without losing what it already knew. The model takes the first frame
        of the scene plus the instruction, and learns to output the sequence of rotation angles
        recorded from the human hand, trained with mean squared error at each timestep.
      </Paragraph>

      <Heading>Results</Heading>
      <Paragraph>
        The perception pipeline ran end to end, from camera input through feature extraction to
        affordance output. It produced consistent object representations across lighting conditions
        and viewing angles, and accurately found handles and grip areas on household objects. Each
        model took around three to five seconds per inference on a high-end GPU.
      </Paragraph>
      <Paragraph>
        The rotation trajectory prediction wasn&apos;t fully implemented within the three months, so
        trajectory models were compared through their architecture and outputs rather than measured
        on a robot. From that analysis, RT-Trajectory had the most explicit and structured way of
        representing rotation.
      </Paragraph>

      <Heading>Takeaways</Heading>
      <Paragraph>
        The most promising setup pairs a strong general-purpose vision encoder like DINOv2 with a
        robotics model that has a rich action representation, like RoboBrain or RT. The natural next
        steps are training a better affordance decoding head, testing across more object categories,
        and finishing the trajectory module so the full perception, affordance, trajectory and
        action pipeline can be measured on a real robot.
      </Paragraph>
    </WorkArticle>
  );
}
