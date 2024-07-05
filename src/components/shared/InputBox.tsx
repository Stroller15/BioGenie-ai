"use client";

import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Slider } from "@/components/ui/slider";
import MetaIcon from "../icons/MetaIcon";
import MistralIcon from "../icons/MistralIcon";
import GemmaIcon from "../icons/GemmaIcon";
import WhisperIcon from "../icons/WhisperIcon";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch"
import { Info, Loader2, SendHorizontal } from "lucide-react";
import { Textarea } from "../ui/textarea";
import  {generateBio}  from "@/lib/actions";


import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { BioContext } from "@/context/BioContext";


const formSchema = z.object({
  model: z.string().min(1, "Model is required"),
  temperature: z
    .number()
    .min(0, "Temperature must be atleast 0")
    .max(2, "Temerature must be at most 1"),
  content: z
    .string()
    .min(50, "The content should contain at least 50 characters.")
    .max(500, "The content should be a maximum of 500 characters."),
  type: z.enum(["personal", "brand"], {
    errorMap: () => ({ message: "Type is required!" }),
  }),
  tone: z.enum(
    [
      "professional",
      "casual",
      "sarcastic",
      "funny",
      "passionate",
      "thoughtful",
    ],
    {
      errorMap: () => ({ message: "Tone is required!" }),
    }
  ),
  emojis: z.boolean(),
});

const InputBox = () => {
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      model: "llama3-8b-8192",
      temperature: 1,
      content: "",
      type: "personal",
      tone: "professional",
      emojis: false,
    },
  });

  const {setOutput, setLoading, loading} = useContext(BioContext)

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);

    const userInputValues = `
    User Input: ${values.content},
    Bio Tone: ${values.tone},
    Bio Type: ${values.type},
    Add Emojis: ${values.emojis}
    `
try{
  const {data} = await generateBio(userInputValues, values.temperature, values.model)
  setOutput(data);
  setLoading(false);
}catch(e) {
  console.log(e);
  setLoading(false);
}
}

  return (
    <div className="relative flex flex-col items-start gap-8">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="grid w-full items-start gap-6"
        >
          <fieldset className="grid gap-6 rounded-[8px] border p-4 bg-background/10 backdrop-blur-sm">
            <legend>AI Settings</legend>

            <div className="grid gap-3">
              <FormField
                control={form.control}
                name="model"
                render={({ field }) => (
                  <FormItem>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormLabel>Model</FormLabel>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a AI model" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="llama3-8b-8192">
                          <div className="flex items-start gap-3 text-muted-foreground">
                            <MetaIcon className="size-5" />
                            <div>
                              <p>
                                <span className="text-foreground font-medium mr-2">
                                  LLaMA 3{" "}
                                </span>
                                8b
                              </p>
                            </div>
                          </div>
                        </SelectItem>
                        <SelectItem value="llama3-70b-8192">
                          <div className="flex items-start gap-3 text-muted-foreground">
                            <MetaIcon className="size-5" />
                            <div>
                              <p>
                                <span className="text-foreground font-medium mr-2">
                                  LLaMA 3{" "}
                                </span>
                                70b
                              </p>
                            </div>
                          </div>
                        </SelectItem>
                        <SelectItem value="mixtral-8x7b-32768">
                          <div className="flex items-start gap-3 text-muted-foreground">
                            <MistralIcon className="size-5" />
                            <div>
                              <p>
                                <span className="text-foreground font-medium mr-2">
                                  Mixtral
                                </span>
                                8x7b
                              </p>
                            </div>
                          </div>
                        </SelectItem>
                        <SelectItem value="gemma-7b-it">
                          <div className="flex items-start gap-3 text-muted-foreground">
                            <GemmaIcon className="size-5" />
                            <div>
                              <p>
                                <span className="text-foreground font-medium mr-2">
                                  Gemma
                                </span>
                                7b
                              </p>
                            </div>
                          </div>
                        </SelectItem>
                        <SelectItem value="whisper-large-v3">
                          <div className="flex items-start gap-3 text-muted-foreground">
                            <WhisperIcon className="size-5" />
                            <div>
                              <p>
                                <span className="text-foreground font-medium mr-2">
                                  Whisper
                                </span>
                              </p>
                            </div>
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
            </div>

            <div className="grid gap-3">
              <FormField
                control={form.control}
                name="temperature"
                render={({ field: { value, onChange } }) => (
                  <FormItem>
                    <FormLabel className="flex items-center justify-between pb-2">
                      <span className="flex items-center justify-center">
                        Creativity
                        <Tooltip>
                          <TooltipTrigger>
                            <Info className="w-4 h-4 ml-1 cursor-pointer" />
                          </TooltipTrigger>
                          <TooltipContent
                            sideOffset={25}
                            collisionPadding={20}
                            className="max-w-sm"
                          >
                            <p>
                              A higher value on slider produces more creative
                              and surprising bios, while a lower value stick to
                              more predictable and conventional style.
                            </p>
                          </TooltipContent>
                        </Tooltip>
                      </span>

                      <span>{value}</span>
                    </FormLabel>
                    <FormControl>
                      <Slider
                        defaultValue={[1]}
                        min={0}
                        max={2}
                        step={0.1}
                        onValueChange={(val) => onChange(val[0])}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
          </fieldset>

          <fieldset className="grid gap-6 rounded-[8px] border p-4 bg-background/10 backdrop-blur-sm">
            <legend>User Input</legend>

            <div className="grid gap-3">
              <FormField
                control={form.control}
                name="content"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center justify-between pb-2">
                      About Yourself
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        {...field}
                        placeholder="Add your old linkedin bio or write few sentences about you"
                        className="min-h-[10rem]"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center justify-between pb-2">
                      Type
                    </FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Value" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="personal">Personal</SelectItem>
                        <SelectItem value="brand">Brand</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="tone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Tone
                    </FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Value" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="professional">Professional</SelectItem>
                        <SelectItem value="casual">Casual</SelectItem>
                        <SelectItem value="sarcastic">Sarcastic</SelectItem>
                        <SelectItem value="funny">Funny</SelectItem>
                        <SelectItem value="passionate">Passionate</SelectItem>
                        <SelectItem value="thoughtful">Thoughtful</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
            </div>

            <div className="grid gap-3">
              <FormField
                control={form.control}
                name="emojis"
                render={({ field }) => (
                  <FormItem className="flex item-center">
                    <FormLabel className="text-sm mr-4">
                      Add Emojis
                    </FormLabel>
                    <Switch checked={field.value} onCheckedChange={field.onChange}  className="!my-0"/>
                  </FormItem>
                )}
              />
            </div>
          </fieldset>
          <Button className="rounded" type="submit" disabled={loading}>
            {loading && <Loader2 className="w-4 h-4 mr-2 animate-spin"/>}
            Generate 
            <SendHorizontal className="ml-1" size={15}/>
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default InputBox;
