
-- course-covers: signed URLs work for anyone reading; but for public reads via getPublicUrl we need SELECT policy
CREATE POLICY "Course covers readable by anyone"
ON storage.objects FOR SELECT
USING (bucket_id = 'course-covers');

CREATE POLICY "Admins manage course covers"
ON storage.objects FOR ALL
USING (bucket_id = 'course-covers' AND public.has_role(auth.uid(), 'admin'))
WITH CHECK (bucket_id = 'course-covers' AND public.has_role(auth.uid(), 'admin'));

-- lesson-videos: only enrolled users or admins
CREATE POLICY "Enrolled users read lesson videos"
ON storage.objects FOR SELECT
USING (
  bucket_id = 'lesson-videos'
  AND (
    public.has_role(auth.uid(), 'admin')
    OR EXISTS (
      SELECT 1
      FROM public.lessons l
      JOIN public.enrollments e ON e.course_id = l.course_id
      WHERE l.video_path = storage.objects.name
        AND e.user_id = auth.uid()
    )
  )
);

CREATE POLICY "Admins manage lesson videos"
ON storage.objects FOR ALL
USING (bucket_id = 'lesson-videos' AND public.has_role(auth.uid(), 'admin'))
WITH CHECK (bucket_id = 'lesson-videos' AND public.has_role(auth.uid(), 'admin'));
